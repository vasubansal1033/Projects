const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const db_link = 'mongodb+srv://admin:ifT3YQn1HJUwMExW@cluster0.3pp0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function (db) {
        console.log(db);
        console.log('db connected');
    })
    .catch(function (err) {
        console.log(err);
    });

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            return this.confirmPassword == this.password;
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurantOwner', 'deliveryBoy'],
        default: 'user',
    },
    profileImage: {
        type: String,
        default: 'img/users/default.jpeg'
    }
})

// before save event occurs in db
userSchema.pre('save', function () {
    // console.log('before saving in db');
    // after checking password==confirmPassword, confirmPassword is redundant
    this.confirmPassword = undefined;
});



const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;

