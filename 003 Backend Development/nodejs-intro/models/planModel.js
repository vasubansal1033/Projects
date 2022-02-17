const mongoose = require('mongoose');
const db_link = 'mongodb+srv://admin:ifT3YQn1HJUwMExW@cluster0.3pp0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function (db) {
        // console.log(db);
        console.log('plan db connected');
    })
    .catch(function (err) {
        console.log(err);
    });

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, "plan name should not exceed 20 characters"]
    },
    duration: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: [true, 'price not entered']
    },
    ratings: {
        type: Number,
    },
    discount: {
        type: Number,
        validate: [function () {
            return this.discount < 100;
        }, 'discount should not exceed price']
    }
});

const planModel = mongoose.model('planModel', planSchema);
// (async function createPlan() {
//     let planObj = {
//         name: 'Superfood1',
//         duration: 20,
//         price: 140,
//         ratingsAverage: 8,
//         discount: 25
//     }
//     let data = await planModel.create(planObj);
//     console.log(data);
//     // const doc = new planModel(planObj);
//     // await doc.save();
// })();

// model
module.exports = planModel;