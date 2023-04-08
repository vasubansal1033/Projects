const express = require('express');
const userRouter = express.Router();
const {getUser, postSignup, updateUser, deleteUser} = require('../controller/userController');
const protectRoute = require('./authHelper');

userRouter
    .route("/")
    .get(protectRoute, getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = userRouter