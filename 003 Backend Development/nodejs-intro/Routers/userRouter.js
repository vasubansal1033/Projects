const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const path = require('path');

// const protectRoute = require('./authHelper');
const { getUser, getAllUser, updateUser, deleteUser, updateProfileImage } = require('../controller/userController');
const { signup, login, isAuthorised, protectRoute,
    forgetPassword, resetPassword, logout } = require('../controller/authController');
// const { filter } = require('lodash');

// user options
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter.route('/signup')
    .post(signup)

userRouter.route('/login')
    .post(login)

userRouter.route('/forgetPassword')
    .post(forgetPassword)

userRouter.route('/resetPassword/:token')
    .post(resetPassword)

/* ****** Multer start ****** */
// multer for file-upload
// upload -> storage, filter

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.jpeg`)
    }
})
const filter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        cb(null, true) // true -> means it is useful, so store it
    } else {
        cb(new Error("Not an image! Please upload an image"), false) // false means not useful
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
})

// https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
userRouter.post("/profileImage", upload.single('photoName'), updateProfileImage);
//get request
userRouter.get('/profileImage', (req, res) => {
    res.sendFile(path.resolve("./multer.html"));
});
/* ************ */

userRouter.route('/logout')
    .get(logout)

// profile page
userRouter.use(protectRoute);

userRouter.route('/userProfile')
    .get(getUser)

// admin specific function
userRouter.use(isAuthorised(['admin']));

userRouter.route('')
    .get(getAllUser)

module.exports = userRouter;