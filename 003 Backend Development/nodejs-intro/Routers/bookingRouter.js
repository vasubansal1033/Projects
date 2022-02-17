const { protectRoute } = require("../controller/authController");
const { createSession } = require('../controller/bookingController');

const express = require('express');
const bookingRouter = express.Router();

bookingRouter.post('/createSession', protectRoute, createSession);
bookingRouter.get('/createSession', function (req, res) {
    res.sendFile("003 Backend Development\\nodejs-intro\\Routers\\bookingRouter.js");
});

module.exports = bookingRouter;