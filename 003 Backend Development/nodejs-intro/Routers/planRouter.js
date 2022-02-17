const express = require('express');
const planRouter = express.Router();
const { protectRoute, isAuthorised } = require('../controller/authController');
const {getAllPlans, getPlan, createPlan, deletePlan,
     updatePlan, top3plans}
    = require('../controller/planController');

planRouter.route('/allPlans')
    .get(getAllPlans)

// own plan - logged in neccesary
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
    .get(getPlan)

planRouter.use(isAuthorised(['admin', 'restaurantOwner']))

planRouter.route('/crudPlan')
    .post(createPlan)
planRouter.route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)

planRouter.route('/getTop3')
    .get(top3plans)

module.exports = planRouter;

// top 3 plans 
