const userModel = require('../models/userModel');

// User router
module.exports.getUser = async function getUser(req, res) {
    const id = req.id;
    const user = await userModel.findById(id);
    console.log(id, user)

    if (user) {
        return res.json({
            success: true,
            message: `User with id ${user["_id"]} found`,
            data: user
        })
    }

    res.json({
        success: false,
        message: `User with id ${user["_id"]} not found`,
        data: NaN
    })
}

module.exports.getAllUsers = async function getAllUsers(req, res) {
    const users = await userModel.find();
    if (users.length == 0) {
        return res.json({
            "success": true,
            "message": "No users have signedup currently."
        })
    }

    return res.json({
        "success": true,
        "message": `${users.length} users found`,
        "data": users
    })
}

module.exports.updateUser = async function updateUser(req, res) {
    const body = req.body;
    const id = req.params.id;

    try {
        const user = await userModel.findById(id);

        if (!user) {
            return res.json({
                success: false,
                message: `User with id ${user["_id"]} not found`,
                data: NaN
            })
        }

        await userModel.findByIdAndUpdate(id, body);

        res.json({
            "success": true,
            "message": `User with id ${user["_id"]} updated successfully`
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.deleteUser = async function deleteUser(req, res) {
    const body = req.body;
    const id = req.params.id;

    try {
        const user = await userModel.findById(id);

        if (!user) {
            return res.json({
                success: false,
                message: `User with id ${user["_id"]} not found`,
                data: NaN
            })
        }

        await userModel.findByIdAndDelete(id);

        res.json({
            "success": true,
            "message": `User with id ${user["_id"]} deleted successfully`
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.forgotPassword = async function forgotPassword(req, res) {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({
            email: email
        })
        if (!user) {
            return res.json({
                "success": false,
                "message": "Email doesn't exist in our database. Please signup."
            })
        }

        const resetToken = user.createResetToken();
        user.save();

        const resetPasswordLink = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;

        // have to send this link using nodemailer
        return res.json({
            "success": true,
            "message": `Link to reset your password - ${resetPasswordLink}`
        })

    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}

module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        const resetToken = req.params.resetToken;
        const { password, confirmPassword } = req.body;

        if(password != confirmPassword) {
            return res.json({
                "success": false,
                "message": "Password and confirm password do not match"
            })
        }

        const user = await userModel.findOne({
            resetToken: resetToken
        })
        
        user.resetPasswordHandler(password);
        await user.save();

        return res.json({
            "success": true,
            "message": "User password changed successfully. Please login again"
        })
    } catch (e) {
        return res.json({
            "success": false,
            "message": e.message
        })
    }
}