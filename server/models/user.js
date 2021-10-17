import mongoose from 'mongoose'


// not entirely sure how sensitive information is going to be stored yet
// (it will be hashed, but not sure if that is of String datatype)
const userSchema = mongoose.Schema({
    email: String,
    password: String, // see above note
    displayName: {
        type: String,
        default: Date.now()
    },
    joinDate: Date,
    description: String,
    profilePicture: Blob, // not sure if correct
    currentAuctions: Array, // may need adjusting later,
    currentBids: Array,
})

export default UserData;