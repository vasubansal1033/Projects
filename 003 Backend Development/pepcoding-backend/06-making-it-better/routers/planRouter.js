const express = require('express');
const { protectRoute } = require('./authHelper');
const {getAllPlans, getUserPlans, createPlan, updatePlan, deletePlan, getTopThree, buyPlan} = require('../controller/planController');
const {isAuthorized} = require('./authHelper');
const planRouter = express.Router();

// get all plans
planRouter
    .route("/all")
    .get(getAllPlans)

planRouter
    .route("/top_three")
    .get(getTopThree)

// current user apis
// buy plan, get user's plans
planRouter.use(protectRoute);
planRouter
    .route("/buy/:id")
    .post(buyPlan)

planRouter
    .route("/currentUser")
    .get(getUserPlans)

planRouter.use(isAuthorized(["admin", "restaurantOwner"]))
planRouter
    .route("/edit")
    .post(createPlan)

planRouter
    .route("/edit/:id")
    .patch(updatePlan)
    .delete(deletePlan)

module.exports = planRouter;
