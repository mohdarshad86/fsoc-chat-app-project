const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        trim:true
    },
    isGroupChat:{
        type: Boolean, 
        default: false
    },
    users: [{
        type: ObjectId,
        ref: "user"
    }],
    latestMessage:{
        type: ObjectId,
        ref: "message"
    },
    groupAdmin:{
        type: ObjectId,
        ref: "user"
    },
    files: {
        type: String,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('chat', chatSchema)