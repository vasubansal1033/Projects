const express = require('express');
const authRouter = express.Router();
const {getSignup, postSignup, loginUser, logoutUser} = require('../controller/authController');

authRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup)

authRouter
    .route("/login")
    .post(loginUser)

authRouter
    .route("/logout")
    .post(logoutUser)

module.exports = authRouter