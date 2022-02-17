const express = require('express');
const authRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../secrets.js');
const userModel = require('../models/userModel');

authRouter
    .route('/signup')
    .get(middleware1, getSignUp, middleware2)
    .post(postSignUp);

authRouter
    .route('/login')
    .post(loginUser);

/*
req, res parameters gets passed between
middleware functions using next
*/

function middleware1(req, res, next) {
    console.log('middleware1 encountered');
    next();
}
function middleware2(req, res, next) {
    console.log('middleware2 encountered');
    console.log('middleware2 ended req/res cycle')
    res.sendFile('/public/index.html', { root: __dirname });
    // next();
}
function getSignUp(req, res, next) {
    console.log('getSignup called');
    next();
    // res.sendFile('/public/index.html', {root: __dirname});
}
async function postSignUp(req, res) {
    // let obj = req.body;
    let dataObj = req.body;
    let user = await userModel.create(dataObj);

    // console.log('printing in backend', obj);
    res.json({
        message: "User signed up",
        // data: obj
        data: user
    });
}

async function loginUser(req, res) {

    try {

        let data = req.body;

        if (data.email) {
            let user = await userModel.findOne({
                email: data.email
            })
            if (user) {
                // bcrypt -> compare function
                if (user.password == data.password) {
                    // res.cookie('isLoggedIn', true);
                    let uid = user['_id']; // uid
                    let token = jwt.sign({ // signature
                        payload: uid,

                    }, JWT_KEY); // HMAC SHA256 algorithm used by default
                    res.cookie('login', token, {
                        httpOnly: true
                    });

                    return res.json({
                        message: 'user has logged in',
                        userDetails: data
                    })
                } else {
                    return res.json({
                        message: 'Credentials are wrong'
                    })
                }

            } else {
                return res.json({
                    message: 'user not found'
                })
            }
        } else {
            return res.json({
                message: "please enter an email id"
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

module.exports = authRouter;