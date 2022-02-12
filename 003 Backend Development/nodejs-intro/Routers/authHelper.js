// let flag = false; // user logged in or not

const {JWT_KEY} = require('../../secrets.js');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

function protectRoute(req, res, next) {
    if(req.cookies.login) {
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY)
        if(isVerified) {
            next();
        } else {
            return res.json({
                message: 'user not verified'
            })
        }
        
    } else {
        return res.json({
            message: 'operation not allowed'
        })
    }   
}

module.exports = protectRoute;