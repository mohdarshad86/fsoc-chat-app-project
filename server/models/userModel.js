const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
    },
    phone: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true,
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

    // isDeleted: {
    //     type: Boolean,
    //     default: false
    // }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)