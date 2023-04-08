const planModel = require('../models/planModel');
const userModel = require('../models/userModel');

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        const data = await planModel.find();
        if (!data) {
            return res.json({
                "success": false,
                "message": "No plans found"
            })
        }

        return res.json({
            "success": true,
            "message": `${data.length} plans found`,
            "data": data
        })

    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.buyPlan = async function buyPlan(req, res) {
    try {
        const currentUserId = req.id;
        const planId = req.params.id;
        const currUser = await userModel.findById(currentUserId);

        if(!currUser) {
            return res.json({
                "success": false,
                "message": "Current user not found. Please login again."
            })
        }

        currUser.addBoughtPlan(planId);
        currUser.save();

        return res.json({
            "success": true,
            "message": `User ${currentUserId} bought plan ${planId} successfully`
        })
    } catch {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.getUserPlans = async function getUserPlans(req, res) {
    // TODO
}

module.exports.createPlan = async function createPlan(req, res) {
    try {
        const planData = req.body;
        const newPlan = await planModel.create(planData);

        return res.json({
            "success": true,
            "message": `Plan ${planData.name} created successfully`
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        const id = req.params.id;
        const newPlanData = req.body;
        const oldPlan = await planModel.findById(id);
        if (!oldPlan) {
            return res.json({
                "success": false,
                "message": `No plan with id ${id} found`
            })
        }

        await planModel.findByIdAndUpdate(id, newPlanData);

        return res.json({
            "success": true,
            "message": `Plan with id ${id} updated successfully`
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        const id = req.params.id;
        const oldPlan = await planModel.findById(id);
        if (!oldPlan) {
            return res.json({
                "success": false,
                "message": `No plan with id ${id} found`
            })
        }

        await planModel.findByIdAndDelete(id);

        return res.json({
            "success": true,
            "message": `Plan with id ${id} deleted successfully`
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
        const topThreePlans = await planModel.find().sort({
            ratingsAverage: -1
        }).limit(3);

        return res.json({
            "success": true,
            "message": `Top ${topThreePlans.length} plans found`,
            "data": topThreePlans
        })

    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}