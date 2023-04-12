const userModel = require('../models/userModel')
const generateToken = require('../config/generateToekn')

const register = async (req, res) => {
    try {
        const data = req.body
        const { name, phone, email, password, pic } = data

        if (!name || !phone || !email || !password) 
            return res.status(400).send("Please send all the require field")       

        const userExist = await userModel.findOne({ email: data.email })

        if (userExist) return res.status(400).send({ status: false, msg: 'User Already exist, LogIn Please!' })

        const newUser = await userModel.create(data)

        if (!newUser) {
            return res.status(400).send({ status: false, msg: 'Failed to create the User' })
        }

        let user = {
            ...newUser._doc,
            token: generateToken(newUser._doc._id)
        }
        return res.status(201).json(user)
    } catch (error) {
        console.log(error.message);
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
        // res.setHeaders('token', user.token)
        if (userExist) { //&& (await userExist.matchPassword(password))
            return res.status(200).json(user)
        }
        else {
            return res.status(400).json({ status: false, msg: 'Invalid Credentials' })
        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//api/user?search=batsy (query) //asyncHandler
const allUsers = async (req, res) => {
    try {
        const keyword = req.query.search ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {};

        const users = await userModel.find(keyword).find({ _id: { $ne: req.user._id } })

        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { register, Login, allUsers }