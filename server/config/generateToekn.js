const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, 'secret-key', { expiresIn: '30d' })
}

module.exports = generateToken