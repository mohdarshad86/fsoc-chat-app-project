const mongoose = require('mongoose')
const otpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('otp', otpSchema)