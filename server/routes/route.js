const router = require('express').Router()
const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')
const authorise = require('../midllewares/authMiddleware')

//user
//SIGNUP
// router.route('/').post(userController.register)
router.post('/api/user', userController.register)
//LOGIN
router.post('/api/user/login', userController.Login)
//GET ALL USER
router.get('/api/user', authorise.auth, userController.allUsers)

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



router.all('*', (req, res) => {
    return res.status(400).send('Invalid URL')
})

module.exports = router