const mongoose = require('mongoose');
const { planSchema } = require('./schemas/planSchema');

require('dotenv').config();
const MONGOOSE_ATLAS_PASSWORD = process.env.MONGOOSE_ATLAS_PASSWORD;

const db_link = `mongodb+srv://vasub:${MONGOOSE_ATLAS_PASSWORD}@cluster0.fk22p.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(db_link)
    .then((db) => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log(err)
    })

const planModel = mongoose.model('planModel', planSchema);

// (async function() {
//     let planObj = {
//         name: "test plan 2",
//         duration: 12,
//         price: 105,
//         ratingsAverage: 4.9,
//         discount: 45
//     }
//     const data = await planModel.create(planObj);
//     console.log(data);
// })()
module.exports = planModel;