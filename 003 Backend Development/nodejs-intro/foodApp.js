const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
// const stripe = require('stripe')

//middleware function -> used in post requests, frontend->json
app.use(express.json()); // global middleware

app.use(cookieParser());

// const userRouter = express.Router();
// const authRouter = express.Router();
const userRouter = require('./Routers/userRouter');
// const authRouter = require('./Routers/authRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter = require('./Routers/bookingRouter');


app.use('/user', userRouter);
// app.use('/auth', authRouter);
app.use('/plans', planRouter);
app.use('/reviews', reviewRouter);
app.use('/booking', bookingRouter);
// const planModel = require('./models/planModel');

app.listen(3000);