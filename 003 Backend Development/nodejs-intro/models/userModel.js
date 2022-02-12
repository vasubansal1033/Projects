const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

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
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'restaurantOwner', 'deliveryBoy'],
        default: 'user',
    },
    profileImage:{
        type: String,
        default: 'img/users/default.jpeg'
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

// userSchema.pre('save', async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     // console.log(hashedString);
//     this.password = hashedString;
// });

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
module.exports = userModel;

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
