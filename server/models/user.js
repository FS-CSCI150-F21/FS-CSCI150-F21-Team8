import mongoose from 'mongoose'


// not entirely sure how sensitive information is going to be stored yet
// (it will be hashed, but not sure if that is of String datatype)
const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        default: '',
    }, // need to add some method of validation (ensure that email is an email, ensure that email is not duplicate)
    password: {
        type: String,
        required: true,
        default: '',
    }, // see above note
    displayName: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    joinDate: {
        type: Date,
        default: Date.now(),
    },
    profilePicture: {
        type: Buffer,
        default: null,
    }, // not sure if correct datatype
    currentAuctions: {
        type: Array,
        of: mongoose.Schema.ObjectId,
        default: []
    }, // not sure if correct declaration
    currentBids: {
        type: Array,
        of: mongoose.Schema.ObjectId,
        default: []
    },
}, { collection: 'users'})

const UserData = mongoose.model('user', userSchema);

export default UserData;