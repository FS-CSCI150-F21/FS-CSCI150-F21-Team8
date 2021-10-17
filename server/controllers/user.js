import UserData from '../models/user.js';

// httpstatus.com for codes
export const getUser = async (req, res) => {
    try {
        // get user by filters (displayname, id, )
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