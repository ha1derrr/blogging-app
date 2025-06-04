const jwt = require('jsonwebtoken')
const secret = "#@!d3r"

function createTokenForUser(user){  
    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
        profilePageURL:user.profilePageURL,
        role:user.role
    }
    const token = jwt.sign(payload, secret)
    return token
}

function validateToken(token){
    const payload = jwt.verify(token, secret)
    return payload
}

module.exports = {createTokenForUser, validateToken}