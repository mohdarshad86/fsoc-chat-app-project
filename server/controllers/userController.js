const userModel = require('../models/userModel')

const createUser = async (req, res) => {
    try {
        const data = req.body

        const userData = await userModel.create(data)

        return res.status(201).send({ status: true, data: userData })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { createUser }