const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userSchema } = require('./schemas/userSchema');

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

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;