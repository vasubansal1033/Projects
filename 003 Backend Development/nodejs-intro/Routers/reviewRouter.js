const express = require('express');
const reviewRouter = express.Router();
const { protectRoute, isAuthorised } = require('../controller/authController');
const { getAllReviews, top3reviews, getPlanReviews, createReview,
    updateReview, deleteReview } = require('../controller/reviewController');
reviewRouter.route('/all')
    .get(getAllReviews)

reviewRouter.route('/top3reviews')
    .get(top3reviews);

reviewRouter.route('/:id')
    .get(getPlanReviews);

reviewRouter.use(protectRoute);
reviewRouter.route('/crud/:planId')
    .post(createReview)
    .patch(updateReview)
    .delete(deleteReview)

module.exports = reviewRouter;
