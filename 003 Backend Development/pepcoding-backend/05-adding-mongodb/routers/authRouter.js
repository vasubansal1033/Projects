const express = require('express');
const authRouter = express.Router();
const {getSignup, postSignup, loginUser} = require('../controller/authController');

authRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup)

authRouter
    .route("/login")
    .post(loginUser)

module.exports = authRouter