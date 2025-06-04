const { validateToken } = require("../services/auth")

function checkForAuthenticationCookie(cookieName){
    return (req, res, next) => {    
        const tokenCookieValue = req.cookies[cookieName]
        // console.log('tokenValue', tokenCookieValue)
        if(!tokenCookieValue){
            return next()
        }
        try{
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload
        }catch(e){}
        return next()
    }
}

module.exports = {checkForAuthenticationCookie}