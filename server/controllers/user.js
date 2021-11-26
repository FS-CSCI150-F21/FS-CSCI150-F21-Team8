import UserData from '../models/user.js';
import bcrypt from 'bcrypt';

const handleErrors = (error) => {
    let error_message = {}
    if (error.code === 11000) {
        error_message['email'] = 'Email already in use'
    }    
    if (error.code === 'PASSWORD_ERROR_DISP') {
        error_message['password'] = 'Password must not include the display name'
    }
    if (error.code === 'PASSWORD_ERROR_STR') {
        error_message['password'] = 'Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, and 1 number'
    }
    if (error.message.includes("user validation failed")){
        Object.values(error.errors).forEach(({properties}) => {
            error_message[properties.path] = properties.message
        })
    }

    console.log(error_message)
    if (Object.keys(error_message).length === 0) {
        error_message = error;
    }
    return error_message
}

// httpstatus.com for HTTP status codes
export const getUser = async (req, res) => {
    // example: get 3 users with name that contains example sort by newest accounts first
    // http://localhost:5000/user/get?displayName=example&num=3&joinDate=-1
    // example: get a user by email
    // http://localhost:5000/user/get?email=test7@gmail.com
    try {
        let num = 1
        let sortR = 1;
        let sortD = 1;
        let query = UserData.find()
        if (req.query.num) {
            if (req.query.num > 10) {
                num = 10
            } else {
                num = parseInt(req.query.num)
            }
        }
        if (req.query.displayName) {
            query.where("displayName", `${req.query.displayName}`).regex(`(?i)${req.query.displayName}`)
        }
        if (req.query.id) {
            query.where("_id", `${req.query.id}`)
        }
        if (req.query.email) {
            query.where('email', `${req.query.email}`)
        }
        if (req.query.ratingSort) {
            if (req.query.ratingSort == -1) {
                sortR = -1
            }
        }
        if (req.query.joinDate) {
            if (req.query.joinDate == -1) {
                sortD = -1
            }
        }
        
        const user = await UserData.find(query).sort({'joinDate': sortD, 'rating': sortR}).limit(num).exec()
        // if (req.query.image) {
            // res.sendFile("user-images/" + user[0].profilePicture, {root: process.cwd()})
        // } else {
            res.status(200).json(user);
        // }
    } catch (error) {
        res.status(404).json({message: error.message})     
    }
}

export const loginUser = async (req, res) => {
    // example: http://localhost:5000/user/login?email=test7@gmail.com&password=Example1234!
    try {
        let query = UserData.find()
        if (!(req.query.id) && !(req.query.email)) {
            throw new Error("Must provide email or user id")
        }
        if (!(req.query.password)) {
            throw new Error("Must provide password")
        }
        if (req.query.id) {
            query.where("_id", `${req.query.id}`)
        }
        if (req.query.email) {
            query.where('email', `${req.query.email}`)
        }
        const user = await UserData.findOne(query).sort({'joinDate': 1}).limit(1).exec()
        if (user === null) {
            throw new Error("No account exists with the given id or email")
        }
        const pass_check = bcrypt.compareSync(req.query.password, user.password)

        if (pass_check) {
            res.status(200).json({...user, message: "Passwords match"})
        } else {
            throw new Error("Passwords do not match")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    
    try {
        const user = req.body;
        user.profilePicture = req.file.filename;
        const newUser = new UserData(user);
        await newUser.save()
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(400).json(handleErrors(error))  
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await UserData.findByIdAndRemove(id).exec();
        res.status(200).json({message: 'User Deleted.'});
    } catch (error) {
        res.status(500).json({message: error.message})     
    }
}

export const updateUser = async (req, res) => {
    try {
        let v = true;
        console.log(req.params.id, req.body)
        const user = await UserData.findOne({_id: req.params.id}).exec()
        // console.log(user)
        if (req.body.currentAuctions){
            user.currentAuctions.push(req.body.currentAuctions)
        }
        if (req.body.currentBids) {
            user.currentBids.push(req.body.currentBids)
        }
        if (req.body.displayName){
            user.displayName = req.body.displayName
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        if (req.body.password) {
            user.password = req.body.password
        }
        if (req.body.rating) {
            user.rating = req.body.rating
        }
        if (req.body.profilePicture) {
            user.profilePicture = req.body.profilePicture
        }
        await user.save()
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}