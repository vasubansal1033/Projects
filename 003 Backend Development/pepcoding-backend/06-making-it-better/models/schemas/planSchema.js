const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, "Name length should be less than 20"]
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, "Price not entered"]
    },
    ratingsAverage: {
        type: Number
    },
    discount: {
        type: Number,
        validation: [function() {
            return this.discount < this.price
        }, "Discount should not exceed price"]
    },
    reviews: [{
        type: mongoose.Schema.ObjectId,
        ref: 'reviewModel'
    }]
});

planSchema.methods.addReview = function (reviewId, reviewRating) {
    let totalRatings = this.ratingsAverage * this.reviews.length;
    this.reviews.push(reviewId);
    totalRatings += reviewRating;
    this.ratingsAverage = totalRatings / this.reviews.length;
}

module.exports.planSchema = planSchema