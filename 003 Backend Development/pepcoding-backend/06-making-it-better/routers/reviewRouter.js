const express = require('express');
const { protectRoute, isAuthorized } = require('./authHelper');
const {getAllReviews, getTopThree, getPlanReviews, createReview, updateReview, deleteReview} = require('../controller/reviewController');
const reviewRouter = express.Router();

reviewRouter
    .route("/all")
    .get(getAllReviews)

reviewRouter
    .route("/top_three")
    .get(getTopThree)

reviewRouter
    .route("/plan/:id")
    .get(getPlanReviews)

reviewRouter.use(protectRoute)
reviewRouter
    .route("/create")
    .post(createReview)

reviewRouter.use(isAuthorized(["user", "restaurantOwner"]))
reviewRouter
    .route("/edit")
    .patch(updateReview)
    .delete(deleteReview)

module.exports = reviewRouter;

