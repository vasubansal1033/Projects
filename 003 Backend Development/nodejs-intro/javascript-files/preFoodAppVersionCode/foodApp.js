const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

//middleware function -> used in post requests, frontend->json
app.use(express.json()); // global middleware

app.use(cookieParser());

// const userRouter = express.Router();
// const authRouter = express.Router();
const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(3000);