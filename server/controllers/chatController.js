const chatModel = require('../models/chatModel')
const userModel = require('../models/userModel')


const createChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent");
        return res.status(400).send("UserId param not present")
    }

    var isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await userModel.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        return res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await chatModel.create(chatData);
            const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            return res.status(200).json(FullChat);
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({ status: false, message: error.message })
        }
    }
};

const getChats = async (req, res) => {
    try {
        chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await userModel.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                return res.status(200).send(results);
            });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: error.message })
    }
};

const createGroup = async (req, res) => {
    if (!req.body.users || !req.body.name)
        return res.status(400).send({ message: "Please Fill all the feilds" });

    //The frondend is gonna send stringify format of Array so we need to parse it
    var users = JSON.parse(req.body.users);

    if (users.length < 2)
        return res.status(400).send("More than 2 users are required to form a group chat");


    users.push(req.user);

    try {
        let groupDetails = {
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        }
        const groupChat = await chatModel.create(groupDetails);

        const fullGroupChat = await chatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json(fullGroupChat);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: error.message })
    }
};

const renameGroup = async (req, res) => {
    try {
        const { chatId, chatName } = req.body;

        const newName = await chatModel.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!newName) {
            return res.status(400).send({ status: false, message: 'Chat not found' })
        } else {
            return res.status(200).json(newName);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: error.message })
    }
};

const addUsersToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;

        // check for the Admin
        const groupChatExists = await chatModel.findOne({ _id: chatId }); // Find if group chat exists.

        if (!groupChatExists) { // Error: No group chat with the given id exists.
            return res.status(400).json({ status: false, message: "Invalid group chat Id." });
        }

        if (!groupChatExists.groupAdmin.equals(req.user._id)) { // Error: Requester is not the admin of this group.
            return res.status(401).json({ status: false, message: "Only the admin can add people to the group." });
        }

        const addedUser = await chatModel.findByIdAndUpdate(chatId, { $push: { users: userId }, }, { new: true, })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!addedUser) {
            return res.status(400).send({ status: false, message: 'Chat not found' })
        } else {
            return res.status(200).json(addedUser);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: error.message })
    }
};

const removeUsersFromGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;

        // check for the Admin
        const groupChatExists = await Chat.findOne({ _id: chatId }); // Find if group chat exists.

        if (!groupChatExists) { // Error: No group chat with the given id exists.
            return res.status(400).json({ status: false, message: "Invalid group chat Id." });
        }

        if (!groupChatExists.groupAdmin.equals(req.user._id)) { // Error: Requester is not the admin of this group.
            return res.status(401).json({ status: false, message: "Only the admin can remove people from the group." });
        }

        const removeUser = await chatModel.findByIdAndUpdate(chatId, { $pull: { users: userId }, }, { new: true, })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!removeUser) {
            return res.status(400).send({ status: false, message: 'Chat not found' })
        } else {
            return res.status(200).json(removeUser);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, message: error.message })
    }
};
module.exports = { createChat, getChats, createGroup, renameGroup, addUsersToGroup, removeUsersFromGroup }