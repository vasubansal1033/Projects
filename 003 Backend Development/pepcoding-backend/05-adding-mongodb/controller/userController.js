const userModel = require('../models/userModel');

// User router
module.exports.getUser = async function getUser(req, res) {
    const body = req.body;

    const user = await userModel.findOne({
        email: body.email
    });

    if (user) {
        return res.json({
            success: true,
            message: `User with email ${body.email} found`,
            data: user
        })
    }

    res.json({
        success: false,
        message: `User with email ${body.email} not found`,
        data: NaN
    })
}

module.exports.updateUser = async function updateUser(req, res) {
    const body = req.body;
    let u = await userModel.findOne({
        email: body.email
    })

    if (!u) {
        return res.json({
            success: false,
            message: `User with email ${body.email} not found`,
            data: NaN
        })
    }

    u = await userModel.findOneAndUpdate({
        email: body.email
    }, body);

    res.json({
        "success": true,
        "message": `User with email ${body.email} updated successfully`
    })
}

module.exports.deleteUser = async function deleteUser(req, res) {

    const body = req.body;
    let u = await userModel.findOne({
        email: body.email
    })

    if (!u) {
        return res.json({
            success: false,
            message: `User with email ${body.email} not found`,
        })
    }

    u = await userModel.findOneAndDelete({
        email: body.email
    });

    res.json({
        "success": true,
        "message": `User with email ${body.email} deleted successfully`
    })
}
