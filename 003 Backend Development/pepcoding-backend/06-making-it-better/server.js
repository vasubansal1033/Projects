const express = require('express');
const app = express();
const userModel = require('./models/userModel');
const planModel = require('./models/planModel');
const cookieParser = require('cookie-parser');

const PORT = 3000;
app.use(express.json());
app.use(cookieParser());

const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const planRouter = require('./routers/planRouter');
const reviewRouter = require('./routers/reviewRouter');

app.use("/user", userRouter); 
app.use("/auth", authRouter);
app.use("/plan", planRouter);
app.use("/review", reviewRouter);

app.listen(PORT)