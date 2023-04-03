const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/user', userController.createUser)

router.all('*', (req, res) => {
    return res.status(400).send('Invalid URL')
})

module.exports = router