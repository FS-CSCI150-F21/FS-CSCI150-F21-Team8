import UserData from '../models/user.js';

const handleErrors = (error) => {
    let error_message = {}
    if (error.code === 11000) {
        error_message['email'] = 'Email already in use'
    }    
    if (error.code === 'PASSWORD_ERROR') {
        error_message['password'] = 'Password must not include the display name'
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
    try {
        // get user by filters (displayname, id, )
        console.log(req.query)
        let num = 1
        let sort = 1;
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
            if (req.query.ratingSort = -1) {
                sort = -1
            }
        }
        const user = await UserData.find(query).sort({'joinDate': 1, 'rating': sort}).limit(num).exec()
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message})     
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    try {
        const newUser = new UserData(user);
        await newUser.save()
        res.status(201).json(newUser);
    } catch (error) {
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
        console.log(req.params.id, req.body.currentAuctions)
        const user = await UserData.findOne({id: req.params.id}).exec()
        if (req.body.currentAuctions){
            user.currentAuctions.push(req.body.currentAuctions)
        }
        if (req.body.currentBids) {
            user.currentBids.push(req.body.currentBids)
        }
        if (req.body.displayName){
            user.displayName = req.body.displayName
        }
        await user.save()
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}