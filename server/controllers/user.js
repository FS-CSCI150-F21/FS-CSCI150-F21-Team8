import UserData from '../models/user.js';

// httpstatus.com for codes
export const getUser = async (req, res) => {
    const name = req.params.displayName;
    try {
        // get user by filters (displayname, id, )
        const user = await UserData.find({displayName: `${name}`}).exec()
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message})     
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new UserData(user);
    try {
        await newUser.save()
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error.message})     
    }
}

export const deleteUser = async (req, res) => {
    // deleting by id, will change to add more later
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