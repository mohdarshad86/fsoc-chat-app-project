const chatModel = require('../models/chatModel');
const messageModel = require('../models/messageModel');
const userModel = require('../models/userModel');

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body

    if (!content || !chatId)
        return res.status(400).send("Invalid data passed into request");

    var newMessage = {
        //sender from token
        sender: req.user._id,
        //content from frontend typed message
        content: content,
        //chatId from frontend fetched data
        chat: chatId
    }

    try {
        var message = await messageModel.create(newMessage)

        //
        message = await message.populate('sender', 'name pic')
        message = await message.populate('chat')
        message = await userModel.populate(message, {
            path: "chat.user",
            select: "name pic email"
        })

        await chatModel.findByIdAndUpdate(chatId, {
            latestMessage: message
        })

        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const allMessage = async (req, res) => {
    try {
        let paramChatId = req.params.chatId
        const message = await messageModel.find({ chat: paramChatId }).populate('sender', 'name pic email').populate('chat')

        return res.status(200).json(message)
    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }
}

module.exports = { sendMessage, allMessage }