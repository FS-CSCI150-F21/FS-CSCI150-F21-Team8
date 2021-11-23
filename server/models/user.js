import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'
import isStrongPassword from 'validator/lib/isStrongPassword.js'
import bcrypt from 'bcrypt'

const validatePW = function(props) {
    console.log('a', props, this._doc, this)
    return isStrongPassword()
}

const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required'],
        unique: true,
        default: '',
        validate: [isEmail, 'Enter a valid email']
    }, 
    password: {
        type: String,
        required: [true, 'Password is required'],
        default: '',
        // validate: [isStrongPassword, 'Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, and 1 number']
    }, 
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
        type: String,
        default: '',
    }, // not sure if correct datatype
    currentAuctions: {
        type: Array,
        of: mongoose.Schema.ObjectId,
        default: []
    }, 
    currentBids: {
        type: Array,
        of: mongoose.Schema.ObjectId,
        default: []
    },
    rating: {
        type: Number,
        default: 5,
    },
    phoneNumber: {
        type: String,
        default: ''
    }
}, { collection: 'users'})

userSchema.pre('save', async function(next) {
    // console.log('b', this._doc, this.isNew, this.modifiedPaths())
    if (this.isNew || this.modifiedPaths().includes('password')){
        const reg = new RegExp(`${this._doc.displayName}`, 'i')
        if (!isStrongPassword(this._doc.password)) {
            let error = new Error('Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, and 1 number')
            error.code = 'PASSWORD_ERROR_STR'
            throw error
        }
        if (reg.test(this._doc.password)) {
            let error = new Error('Password must not include the display name')
            error.code = 'PASSWORD_ERROR_DSP'
            throw error
        } else {
            const salt = bcrypt.genSaltSync(10);
            this._doc.password = await bcrypt.hash(this.password, salt)
        }
    }
    next();
})

userSchema.set('validateBeforeSave', false);

const UserData = mongoose.model('user', userSchema);
export default UserData;