const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')


const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //token = Bearer "erfvde456yhgbniu"
            token = req.headers.authorization.split(' ')[1]

            //decode tpken and verify id
            const decoded = jwt.verify(token, "secret-key")

            req.user = await userModel.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            return res.status(401).send("Not Authorised")
        }
    }
    if (!token) {
        return res.status(401).send("Not Authorised Token")
    }
}

module.exports = { auth }