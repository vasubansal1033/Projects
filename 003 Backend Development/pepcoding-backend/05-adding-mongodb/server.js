const express = require('express');
const app = express();
const userModel = require('./models/userModel');
const cookieParser = require('cookie-parser');

const PORT = 3000;
app.use(express.json());
app.use(cookieParser());

const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');

app.use("/user", userRouter); 
app.use("/auth", authRouter);

app.listen(PORT)