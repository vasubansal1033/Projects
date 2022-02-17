const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../secrets.js');
const userModel = require('../models/userModel');
const {sendMail} = require('../utilities/nodemailer');
// signup user
module.exports.signup = async function signUp(req, res) {

    try {
        // let obj = req.body;
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        if (user) {
            // console.log('printing in backend', obj);
            sendMail('signup', user);
            res.json({
                message: "User signed up",
                // data: obj
                data: user
            });
        } else {
            res.json({
                message: "error while signing up"
            })
        }

    } catch (error) {
        res.json({
            message: error.message
        })
    }

}

// login user
module.exports.login = async function login(req, res) {

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

// isAuthorised - to check the users role
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        } else {
            res.status(401).json({
                message: "operation not allowed"
            })
        }
    }
}

// protect route
module.exports.protectRoute = async function protectRoute(req, res, next) {

    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY)

            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;

                console.log(payload);
                console.log(req.role, req.body);

                next();
            } else {
                return res.json({
                    message: 'user not verified'
                })
            }

        } else {
            // browser
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true) {
                return res.redirect('/login');
            }
            // postman
            return res.json({
                message: 'operation not allowed. please login'
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

// forget password
module.exports.forgetPassword = async function forgetPassword(req, res) {
    let { emailv } = req.body;
    try {

        const user = userModel.findOne({
            email: emailv
        })
        if (user) {
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

            // send email to the user
            sendMail('forgotPassword', user);
            // nodemailer
        } else {
            res.json({
                message: "Please signup first"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

// resetPassword
module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmPassword } = req.body;
        const user = await userModel.findOne({
            resetToken: token
        })
        if (user) {
            // resetPasswordHandle will update user password in db
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.json({
                message: 'user password changed successfully. please login again'
            })
        } else {
            res.json({
                message: "user not found"
            })
        }

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

// logout function
module.exports.logout = function logout(req, res) {
    res.cookie('login', '', {
        maxAge: 1
    })
    res.json({
        message: 'user logged out successfully'
    })
}