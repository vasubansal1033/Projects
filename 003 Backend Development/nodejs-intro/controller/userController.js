const userModel = require('../models/userModel');
module.exports.getUser = async function getUser(req, res) {

    let id = req.body;
    let user = await userModel.findById(id);
    if (user) {
        return res.json({ user });
    } else {
        return res.json({
            message: 'user not found'
        })
    }

}
// module.exports.postUser = function postUser(req, res) {
//     console.log(req.body);
//     user = req.body
//     res.json({
//         message: "data received successfully",
//         user: req.body
//     })
// }
module.exports.updateUser = async function updateUser(req, res) {
    // console.log('req.body->', req.body);
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;

        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            console.log(user);
            // this line is important otherwise,
            // confirmPassword has to be set before user model is saved
            // otherwise it will result in validation error
            // now confirmPassword is set
            user.confirmPassword = user.password;
            await user.save();
            // after saving it will become undefined!
            // so no problems

            res.json({
                message: "data updated successfully",
                data: user
            })
        } else {
            res.json({
                message: "user not found"
            });
        }
    } catch (error) {
        res.json({
            message: "Error: "+error.message
        })
    }

}
module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: 'user not found'
            })
        }
        res.json({
            message: "data has been deleted",
            deletedUser: user
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
module.exports.getAllUser = async function getAllUser(req, res) {
    try {
        let users = await userModel.find();
        if (users) {
            res.json({
                message: 'users retrieved',
                data: users
            })
        } else {
            res.json({
                message: 'no users found'
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
module.exports.setCookies = function setCookies(req, res) {
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.cookie('isLoggedIn', false, {
        maxAge: 10000 * 60 * 60 * 24,
        secure: true,
        httpOnly: true
    });
    // can be seen using document.cookie in browser console
    res.cookie('isPrimeMember', true); // not secure
    res.send('cookies has been set');
}
module.exports.getCookies = function getCookies(req, res) {
    let cookies = req.cookies;
    // let cookie = req.cookies.isLoggedIn;
    console.log(cookies);
    res.send('cookies received');
}
module.exports.updateProfileImage = function updateProfileImage(req, res) {
    return res.json({
        message: 'file uploaded successfully'
    })
}