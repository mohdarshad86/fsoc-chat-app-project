const userModel = require('../models/userModel')
const generateToken = require('../config/generateToekn')

const register = async (req, res) => {
    try {
        const data = req.body
        const { name, phone, email, password, pic } = data

        if (!name || !phone || !email || !password) {
            return res.status(400).send("Please send all the require field")
        }

        const userExist = await userModel.findOne({ email: data.email })

        if (userExist) return res.status(400).send({ status: false, msg: 'User Already exist, LogIn Please!' })

        // const newUser = new userModel(data)
        // await newUser.save()

        const newUser = await userModel.create(data).toObject()

        if (!newUser) {
            return res.status(400).send({ status: false, msg: 'Failed to create the User' })
        }

        let user = {
            ...newUser,
            token: generateToken(newUser._id)
        }
        return res.status(201).json({ status: true, data: user })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const Login = async (req, res) => {
    try {
        let data = req.body
        let { email, password } = data

        let userExist = await userModel.findOne({ email }).select({ password: 0 })

        if (!userExist) return res.status(400).json({ status: false, msg: 'Invalid Credentials' })

        let user = {
            ...userExist._doc,
            token: generateToken(userExist._id)
        }

        if (userExist) { //&& (await userExist.matchPassword(password))
            return res.status(200).json({ status: true, data: user })
        }
        else {
            return res.status(400).json({ status: false, msg: 'Invalid Credentials' })
        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { register, Login }