const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            return res.json({
                message: 'reviews retrieved',
                data: reviews
            })
        } else {
            return res.json({
                message: 'reviews not found'
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}
module.exports.top3reviews = async function top3reviews(req, res) {
    try {
        const reviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3);
        if (reviews) {
            return res.json({
                message: 'reviews retrieved',
                data: reviews
            })
        } else {
            return res.json({
                message: 'reviews not found'
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}
module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        const planId = req.params.id;
        let reviews = await reviewModel.find();
        if (reviews) {
            reviews = reviews.filter((review) => {
                return review.plan["_id"] == planId;
            })
            return res.json({
                message: 'reviews for particular plan retrieved',
                data: reviews
            })
        } else {
            return res.json({
                message: 'reviews for particular plan not found'
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}
module.exports.createReview = async function createReview(req, res) {
    try {
        console.log(123)
        let id = req.params.planId;
        let plan = planModel.findById(id);
        let review = await reviewModel.create(req.body);
        plan.ratings = (plan.ratings + req.body.ratings) / 2;

        await review.save();
        await plan.save();

        res.json({
            message: 'review created',
            data: review
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}
module.exports.updateReview = async function (req, res) {

    try {
        let planId = req.params.id;
        // from frontend
        // user will search for a particular plan
        // from frontend click on particular review to delete it
        // from here we will send the review id
        let reviewId = req.body.rid;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            if (key == 'rid') continue;
            keys.push(key);
        }
        let review = await reviewModel.findById(reviewId);
        for (let i = 0; i < keys.length; i++) {
            review[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await review.save();

        return res.json({
            message: 'review updated successfully',
            data: review
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let planId = req.params.id;
        // from frontend
        let reviewId = req.body.rid;
        let deletedReview = await reviewModel.findByIdAndDelete(reviewId);
        return res.json({
            message: 'review deleted successfully',
            data: deletedReview
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}