const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    // userId: {
    //     type: ObjectId,
    //     required: true
    // },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        min: 8,
        max: 15
    },
    Image: {
        type: String,
        // required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)