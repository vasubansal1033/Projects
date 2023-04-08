const { response } = require('express');
const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../models/userModel');

require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY;

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        const jwt = req.cookies.userJWT;
        if(!jwt) {
            const client = req.get('User-Agent');
            if(client.includes("Chrome") == true) {
                return res.redirect("/login")
            }

            return res.json({
                "success": false,
                "message": "Please login first."
            })
        }
    
        const payload = jsonwebtoken.verify(jwt, JWT_KEY);
        const user = await userModel.findById(payload["uid"]);
        
        if(user) {
            req.role = user.role; 
            req.id = user["_id"].toString();
            next();
            return;
        }
        
        return res.json({
            "success": false,
            "message": "User not verified. Please login first."
        })
    } catch(e) {
        return res.json({
            "success": false,
            "message": e.message 
        })
    }
}

module.exports.isAuthorized = function isAuthorized(roles) {
    return function(req, res, next) {
        if(roles.includes(req.role) == true) {
            next();
        } else {
            return res.status(401).json({
                "success": false,
                "message": "You are not authorized."
            })
        }
    }
}