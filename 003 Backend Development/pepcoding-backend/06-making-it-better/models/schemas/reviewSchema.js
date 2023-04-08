const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    reviewText: {
        type: String,
        required: [true, "Empty review is not allowed"]
    },
    rating: {
        type: Number,
        min: [1, "Minimum value is 1"],
        max: [5, "Maximum value is 5"],
        required: [true, "Rating is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true, "Review must belong to a valid user"]
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required: [true, "Review must belong to a valid plan "]
    }

})

// reviewSchema.pre(/^find/, function(next) {
//     this
//         .populate({
//             "path": "user",
//             "select": "name profileImage"
//         })
//         .populate({
//             "path": "plan"
//         })
//     next();
// })

module.exports.reviewSchema = reviewSchema;