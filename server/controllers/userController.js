const userModel = require('../models/userModel')

const addUser = async (req, res) => {
    try {
        const data = req.body
        const userExist = await userModel.findOne({ email: data.email })

        if (userExist) return res.status(500).send({ status: false, msg: 'User Already exist, LogIn Please!' })

        const newUser = new userModel(data)
        await newUser.save()

        return res.status(201).send({ status: true, data: newUser })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        let allUser = await userModel.find({})

        return res.status(200).send({ status: true, data: allUser })
    } catch (error) {

    }
}

module.exports = { addUser }