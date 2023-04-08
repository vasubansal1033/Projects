const express = require('express');
const userRouter = express.Router();
const {getUser, getAllUsers, updateUser, deleteUser,
        forgotPassword, resetPassword} = require('../controller/userController');
const {protectRoute, isAuthorized} = require('./authHelper');

userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/forgotPassword")
    .post(forgotPassword)

userRouter
    .route("/resetPassword/:resetToken")
    .post(resetPassword)

userRouter.use(protectRoute);
userRouter
    .route("/profilePage")
    .get(getUser)

// admin specific work
userRouter.use(isAuthorized(["admin"]))
userRouter
    .route("/getAllUsers")
    .get(getAllUsers)

module.exports = userRouter