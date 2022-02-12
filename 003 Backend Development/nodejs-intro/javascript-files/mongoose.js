const express = require('express');
const app = express();
const mongoose = require('mongoose');
const emailValidator = require('email-validator');

//middleware function -> used in post requests, frontend->json
app.use(express.json()); // global middleware

// let user = [
//     {
//         'id':1,
//         'name':'Vasu',
//         'userName':'vasub'
//     },
//     {
//         'id':2,
//         'name':'Bonda',
//         'userName':'bonda123'
//     },
//     {
//         'id':3,
//         'name':'Popa',
//         'userName':'nannu2006'
//     }

// ];

const userRouter = express.Router();
const authRouter = express.Router();

app.use('/user', userRouter);
app.use('/auth', authRouter);

userRouter
.route('/') // path specific middleware
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')
.get(middleware1, getSignUp, middleware2)
.post(postSignUp);

async function getUsers(req, res) {
    // console.log(req.query);
    // let allUsers = await userModel.find();
    let allUsers = await userModel.findOne({
        name: 'Vasu'
    });
    // res.send(user);
    res.json({
        message: 'list of all users',
        data: allUsers
    })
}
function postUser(req, res) {
    console.log(req.body);
    user = req.body
    res.json({
        message: "data received successfully",
        user: req.body
    })
}
async function updateUser(req, res) {
    console.log('req.body->', req.body);

    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({
        email: 'abc@gmail.com'
    },
        dataToBeUpdated);

    // for(key in req.body){
    //     user[key] = req.body[key];
    // }

    res.json({
        message:"data updated successfully"
    })
}
async function deleteUser(req, res) {
    // user = {};
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete({
            // email: 'aman123@gmail.com'
            dataToBeDeleted
        }
    )
    res.json({
        message: "data has been deleted",
        deletedUser: user
    })
}
function getUserById(req, res) {
    console.log(req.params.username);
    // console.log(req.params);
    let paramId = req.params.id;
    let obj = {};
    for(let i=0; i<user.length; i++) {
        if(user[i]['id']==paramId) {
            obj = user[i];
        }
    }
    res.json({
        message: "request received",
        data: obj
    });
}

/*
req, res parameters gets passed between
middleware functions using next
*/

function middleware1(req, res, next) {
    console.log('middleware1 encountered');
    next();
}
function middleware2(req, res, next) {
    console.log('middleware2 encountered');
    console.log('middleware2 ended req/res cycle')
    res.sendFile('/public/index.html', {root: __dirname});
    // next();
}
function getSignUp(req, res, next) {
    console.log('getSignup called');
    next();
    // res.sendFile('/public/index.html', {root: __dirname});
}
 async function postSignUp(req, res) {
    // let obj = req.body;
    let dataObj = req.body;
    let user = await userModel.create(dataObj);

    // console.log('printing in backend', obj);
    res.json({
        message: "User signed up",
        // data: obj
        data: user
    });
}

const db_link = 'mongodb+srv://admin:ifT3YQn1HJUwMExW@cluster0.3pp0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8,
        validate: function() {
            return this.confirmPassword==this.password;
        }
    }
})

// pre post hooks

// after save event occurs in db
// userSchema.post('save', function(){
//     console.log('after saving in db');
// });

// before save event occurs in db
userSchema.pre('save', function(){
    // console.log('before saving in db');

    // after checking password==confirmPassword, confirmPassword is redundant
    this.confirmPassword = undefined;

});

// model

/*
A schema is fundamentally describing the data construct of a document (in MongoDB collection).
This schema defines the name of each item of data, and the type of data, whether it is a string, 
number, date, Boolean, and so on.
A model is a compiled version of the schema. One instance of the model will map to one document in the database.
It is the model that handles the reading, creating, updating, and deleting of documents. A document in a Mongoose
collection is a single instance of a model. So it makes sense that if we're going to work with our data then it
will be through the model. A single instance of a model 
(like a User instance in var User = mongoose.model('User', userSchema);) maps directly to a single document 
in the database. With this 1:1 relationship, it is the model that handles all document interaction - creating, 
reading, saving, and deleting. This makes the model a very powerful tool.
 */

const userModel = mongoose.model('userModel', userSchema);
// (async function createUser(){
//     let user = {
//         name: 'Popu',
//         email: 'abcd@gmail.com',
//         password: '12345678',
//         confirmPassword: '12345678'
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();

app.listen(3000);