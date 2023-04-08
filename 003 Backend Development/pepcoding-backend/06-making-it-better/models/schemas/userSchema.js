const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const crypto = require('crypto');

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
            return emailValidator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    // confirmPassword: {
    //     type: String,
    //     required: true,
    //     minLength: 8,
    //     validate: function () {
    //         return this.password == this.confirmPassword
    //     }
    // },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurantOwner', 'deliveryBoy'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'img/users/default.jpeg'
    },
    resetToken: {
        type: String
    },
    plans: [{
        type: mongoose.Schema.ObjectId,
        path: 'planModel'
    }]
});

userSchema.methods.createResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    // console.log(this, this.resetToken, resetToken)
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password) {
    this.password = password;
    this.resetToken = undefined;
}

userSchema.methods.addBoughtPlan = function(planId) {
    this.plans.push(planId);
}

userSchema.pre('save', function () {
    // console.log("Before saving", this);
    
    // to avoid saving confirmPassword in db
    this.confirmPassword = undefined;
})
userSchema.pre('save', async function () {
    // let salt = await bcrypt.genSalt(5);
    // let hashedString = await bcrypt.hash(this.password, salt);
    // this.password = hashedString;
    
    // console.log(hashedString);
})

userSchema.post('save', function (doc) {
    // console.log("After saving", doc);
})

module.exports.userSchema = userSchema