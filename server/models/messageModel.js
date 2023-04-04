const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const messageSchema = new mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: ObjectId,
        ref: "chat"
    },
    readBy:
        [{
            type: ObjectId,
            ref: 'user'
        }]

}, { timestamps: true })

module.exports = mongoose.model('message', messageSchema)