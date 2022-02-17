const express = require('express');

const app = express();

//middleware function -> used in post requests, frontend->json
app.use(express.json());

let user = [
    {
        'id': 1,
        'name': 'Vasu',
        'userName': 'vasub'
    },
    {
        'id': 2,
        'name': 'Bonda',
        'userName': 'bonda123'
    },
    {
        'id': 3,
        'name': 'Popa',
        'userName': 'nannu2006'
    }

];

const userRouter = express.Router();
const authRouter = express.Router();

app.use('/user', userRouter);
app.use('/auth', authRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(pathUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById);

authRouter
    .route('/signup')
    .get(middleware, getSignUp)
    .post(postSignUp);

function middleware(req, res, next) {
    console.log('middleware encountered');
    next();
}
function getUser(req, res) {
    console.log(req.query);
    res.send(user);
}
function postUser(req, res) {
    console.log(req.body);
    user = req.body
    res.json({
        message: "data received successfully",
        user: req.body
    })
}
function pathUser(req, res) {
    console.log('req.body->', req.body);

    for (key in req.body) {
        user[key] = req.body[key];
    }

    res.json({
        message: "data updated successfully"
    })
}
function deleteUser(req, res) {
    user = {};
    res.json({
        message: "data has been deleted"
    })
}
function getUserById(req, res) {
    console.log(req.params.username);
    // console.log(req.params);
    let paramId = req.params.id;
    let obj = {};
    for (let i = 0; i < user.length; i++) {
        if (user[i]['id'] == paramId) {
            obj = user[i];
        }
    }
    res.json({
        message: "request received",
        data: obj
    });
}

function getSignUp(req, res) {
    console.log('getSignup called');
    res.sendFile('/public/index.html', { root: __dirname });
}
function postSignUp(req, res) {
    let obj = req.body;
    console.log('printing in backend', obj);
    res.json({
        message: "User signed up",
        data: obj
    })
}

app.listen(3000);