const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (!reviews) {
            return res.json({
                "success": false,
                "message": "Could not retrieve reviews"
            })
        }

        return res.json({
            "success": true,
            "message": `Retrieved ${reviews.length} reviews`,
            "data": reviews
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.getTopThree = async function getTopThree(req, res) {

    try {
        const topThree = await reviewModel
            .find()
            .populate({
                "path": "user",
                "select": "name profileImage"
            })
            .populate({
                "path": "plan",
                "select": "-reviews"
            })
            .sort({ rating: -1 })
            .limit(3)
        if (!topThree) {
            return res.json({
                "success": false,
                "message": "Reviews could not be retrieved"
            })
        }

        return res.json({
            "success": true,
            "message": `Retrieved top ${topThree.length} reviews`,
            "data": topThree
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }

}

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        const planId = req.params.id;
        const planReviews = await planModel
            .findById(planId)
            .select("reviews -_id")
            .populate({
                "path": "reviews",
                "select": "-plan"
            })

        if(!planReviews) {
            return res.json({
                "success": false,
                "message": `Plan with id ${planId} not found`
            })
        }

        return res.json({
            "success": true,
            "message": `Retrieved ${planReviews["reviews"].length} reviews`,
            "data": planReviews
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.createReview = async function createReview(req, res) {
    try {
        const reviewData = req.body;
        const review = await reviewModel.create(reviewData);

        const planId = reviewData.plan;
        const plan = await planModel.findById(planId);


        plan.addReview(review["_id"], review["rating"])
        plan.save();

        return res.json({
            "success": true,
            "message": `Review created with id ${review["_id"]}`
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.updateReview = async function updateReview(req, res) {

}

module.exports.deleteReview = async function deleteReview(req, res) {

}
