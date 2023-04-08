const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY;

function protectRoute(req, res, next) {
    const jwt = req.cookies.userJWT;
    if(!jwt) {
        return res.json({
            "success": false,
            "message": "Please login first."
        })
    }

    const isVerified = jsonwebtoken.verify(jwt, JWT_KEY)
    if(isVerified) {
        next();
        return;
    }
    
    return res.json({
        "success": false,
        "message": "Please login first."
    })
}

module.exports = protectRoute