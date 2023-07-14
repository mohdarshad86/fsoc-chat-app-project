const userModel = require('../models/userModel')
const generateToken = require('../config/generateToekn')
const validator = require("validator");
let validateMobile = /^[6-9][0-9]{9}$/;

const register = async (req, res) => {
    try {
        const data = req.body
        const { name, phone, email, password, pic } = data

        if (!name || !phone || !email || !password)
            return res.status(400).send({ status: false, message: "Please send all the require field" })

        if (!validateMobile.test(phone))
            return res.status(400).send({ status: false, message: "Please enter valid mobile number" });

        if (!validator.isEmail(email.trim()))
            return res.status(400).send({ status: false, message: "Please enter valid email" });

        if (password.length < 6 || password.length > 15)
            return res.status(400).send({ status: false, message: "password length must be 6 to 15" });

        const userExist = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })

        if (userExist) return res.status(400).send({ status: false, message: 'User Already exist, LogIn Please!' })

        const newUser = await userModel.create(data)

        if (!newUser) {
            return res.status(400).send({ status: false, message: 'Failed to create the User' })
        }

        let user = {
            ...newUser._doc,
            token: generateToken(newUser._doc._id)
        }
        return res.status(201).json(user)
    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}

const Login = async (req, res) => {
    try {
        console.log(req)
        let data = req.body
        let { email, password } = data

        if (!validator.isEmail(email.trim()))
            return res.status(400).send({ status: false, message: "Please enter valid email" });

        if (password.length < 6 || password.length > 15)
            return res.status(400).send({ status: false, message: "password length must be 6 to 15" });

        let userExist = await userModel.findOne({ email })

        if (!userExist) return res.status(400).json({ status: false, message: 'Invalid Credentials' })

        let user = {
            ...userExist._doc,
            token: generateToken(userExist._id)
        }

        delete user.password

        if (userExist && (await userExist.matchPassword(password))) {
            return res.status(200).json(user)
        }
        else {
            return res.status(400).json({ status: false, message: 'Invalid Credentials' })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

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
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { pic, name } = req.body

        if (!pic && !name) return res.status(400).json({ status: false, message: 'Please send data to Update' })

        const obj = {}
        if (pic) obj.pic = pic
        if (name) obj.name = name

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,
            {
                $set: obj
            }
            , { new: true }
        )

        return res.status(200).send(updatedUser)
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { register, Login, allUsers, updateUser }