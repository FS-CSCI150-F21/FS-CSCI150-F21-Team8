import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'

const generateClose = () => {
    const d = new Date()
    d.setSeconds(d.getSeconds() + 300);
    return d
}

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required'],
        default: '',
        validate: [isEmail, 'Enter a valid email']
    }, 
    otp: {
        type: Number,
        required: [true, 'OTP is required'],
        default: -1,
    },
    // dateCreated: {
    //     type: Date,
    //     default: Date.now(),
    // },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: '5m',
    },
}, { collection: 'otp'})

const OtpData = mongoose.model('otp', otpSchema);

export default OtpData