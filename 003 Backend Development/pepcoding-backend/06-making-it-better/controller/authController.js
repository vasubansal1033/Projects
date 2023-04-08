const userModel = require('../models/userModel');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');

require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY;

// Auth router 
module.exports.getSignup = function getSignup(req, res) {
    res.sendFile('./views/signup.html', {root: path.dirname(__dirname)});
}

module.exports.postSignup = async function postSignup(req, res) {
    const body = req.body;
    const { email, name, password, confirmPassword, role } = body;
    if(password != confirmPassword) {
        return res.json({
            "success": false,
            "message": "Password and confirm password do not match"
        })
    }

    try {
        const newUser = {
            "email": email,
            "name": name,
            "password": password,
            // "confirmPassword": confirmPassword,
            "role": role
        }
    
        const [result, message] = await createUser(newUser);
        // console.log(result);
        if (!result) {
            return res.json({
                "success": false,
                "message": message
            })
        }
    
        res.json({
            "success": true,
            "message": "User signed up",
            "user": newUser
        })
    } catch(e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.loginUser = async function loginUser(req, res) {
    try {
        const body = req.body;
        if (!body.email) {
            return res.json({
                "success": false,
                "message": "Blank email entered."
            })
        }

        const user = await userModel.findOne({
            email: body.email
        });

        if (!user) {
            return res.json({
                "success": false,
                "message": `User with email ${body.email} does not exist`
            })
        }

        if (body.password != user.password) {
            return res.json({
                "success": false,
                "message": `Wrong credentials`
            })
        }

        let uid = user['_id'];
        let jwt = jsonwebtoken.sign({
            uid: uid
        }, JWT_KEY)

        // res.cookie("isLoggedIn", true);
        res.cookie("userJWT", jwt);

        return res.json({
            "success": true,
            "message": "Successfully logged in"
        })

    } catch (e) {
        console.log(e.message);
    }
}

async function createUser(user) {
    try {
        let data = await userModel.create(user);
        // console.log(data);
        return [true, ""];
    } catch (err) {
        console.log(err.message);
        return [false, err.message];
    }

}

module.exports.logoutUser = async function logoutUser(req, res) {
    res.cookie('userJWT', '', {maxAge: 1});
    res.json({
        "success": true,
        "message": "Logout successful"
    })
}