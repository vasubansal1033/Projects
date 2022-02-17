const planModel = require('../models/planModel');

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            return res.json({
                message: 'all plans received',
                data: plans
            })
        } else {
            return res.json({
                message: 'plans not found'
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
module.exports.getPlan = async function getPlan(req, res) {
    try {
        console.log(123123);
        let id = req.params.id;
        let plan = await planModel.findById(id);
        // let plan = await planModel.find();
        if (plan) {
            return res.json({
                message: 'plan retrieved',
                data: plan
            })
        } else {
            return res.json({
                message: 'plan not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// admin or restaurant owner
module.exports.createPlan = async function createPlan(req, res) {
    try {
        let planData = req.body;
        console.log(planData);
        let createdPlan = await planModel.create(planData);
        return res.json({
            message: 'plan created successfully',
            data: createdPlan
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message: 'plan deleted successfully',
            data: deletedPlan
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        for (let i=0; i<keys.length; i++) {
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await plan.save();

        return res.json({
            message: 'plan updated successfully',
            data: plan
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// top 3 plans
module.exports.top3plans = async function top3plans(req, res) {
    try {
        const plans = await planModel.find().sort({
                ratings: -1
            }).limit(3);
        
        return res.json({
            message: 'top 3 plans',
            data: plans
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}