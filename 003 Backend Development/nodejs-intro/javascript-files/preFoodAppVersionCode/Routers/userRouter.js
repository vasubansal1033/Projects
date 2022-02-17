const express = require('express');
const userRouter = express.Router();
const protectRoute = require('./authHelper');
const { getUsers, getUserById, updateUser, deleteUser, getCookies, setCookies, postUser } = require('../controller/userController');

userRouter
    .route('/') // path specific middleware
    .get(protectRoute, getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

// temporary
userRouter
    .route('/getCookies')
    .get(getCookies)

userRouter
    .route('/setCookies')
    .get(setCookies)


userRouter
    .route('/:id')
    .get(getUserById);

module.exports = userRouter;