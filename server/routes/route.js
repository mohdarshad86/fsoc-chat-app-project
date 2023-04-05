const router = require('express').Router()
const userController = require('../controllers/userController')
let { chats } = require('../database/data')

// router.post('/api/chat', userController.addUser)

// router.get('/api/chat', (req, res) => {
//     // console.log('Hii');
//     // chats=JSON.parse(chats)
//     return res.status(200).send(chats)
// })

// router.get('/api/chat/:id', (req, res) => {
//     const singleChat = chats.find((c) => c._id == req.params.id)
//     return res.status(200).send(singleChat)
// })

//user

// router.get('/login', userController.login)

router.route('/').post(userController.register)
router.post('/login', userController.Login)

router.all('*', (req, res) => {
    return res.status(400).send('Invalid URL')
})

module.exports = router