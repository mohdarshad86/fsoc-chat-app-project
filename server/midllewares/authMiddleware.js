const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')


const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //token = Bearer "erfvde456yhgbniu"
            token = req.headers.authorization.split(' ')[1]

            //decode id
            const decoded = jwt.verify(token, "secret-key")
            
            req.user = await userModel.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not Autherized")
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Not Autherized")
    }
}

module.exports = { auth }