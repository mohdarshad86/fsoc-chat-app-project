const router = require('express').Router()
const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')
const messageController = require('../controllers/messageController')
const authorise = require('../midllewares/authMiddleware')
const otp = require('../midllewares/otpVerification')
//user
//SIGNUP
// router.route('/').post(userController.register)
router.post('/api/user', userController.register)
//LOGIN
router.post('/api/user/login', userController.Login)
//GET ALL USER
router.get('/api/users', authorise.auth, userController.allUsers)
//UPADTE USER
router.put('/api/user', authorise.auth, userController.updateUser)

// chat
//ACCESS CHAT
router.post('/api/chat', authorise.auth, chatController.createChat)
//GET CHATS
router.get('/api/chat', authorise.auth, chatController.getChats)
//GROUP CREATE
router.post('/api/chat/group', authorise.auth, chatController.createGroup)
//RENAME GROUP
router.put('/api/chat/rename', authorise.auth, chatController.renameGroup)
//ADD USER TO GROUP
router.put('/api/chat/add-group', authorise.auth, chatController.addUsersToGroup)
//REMOVE USER TO GROUP
router.put('/api/chat/remove-group', authorise.auth, chatController.removeUsersFromGroup)

//messages
//SEND/POST MESSAGES
router.post('/api/message', authorise.auth, messageController.sendMessage)
//FETCH MESSAGES
router.get('/api/message/:chatId', authorise.auth, messageController.allMessage)

//otp verify
//GENERATE OTP
router.post('/api/user/sendOTP', otp.sendOTP)
//VERIFY OTP
router.post('/api/user/verifyOTP', otp.verifyOTP)

router.all('*', (req, res) => {
    return res.status(400).send('Invalid URL')
})

module.exports = router