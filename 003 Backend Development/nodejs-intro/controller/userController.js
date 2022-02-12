const userModel = require('../models/userModel');

module.exports.getUsers = async function getUsers(req, res) {
    // console.log(req.query);
    // let allUsers = await userModel.find();
    // let allUsers = await userModel.findOne({
    //     name: 'Vasu'
    // });
    // // res.send(user);
    // res.json({
    //     message: 'list of all users',
    //     data: allUsers
    // })
    let users = await userModel.find();
    if(users) {
        return res.json({users});
    } else {
        return res.json({
            message: 'users not found'
        })
    }

}
module.exports.postUser = function postUser(req, res) {
    console.log(req.body);
    user = req.body
    res.json({
        message: "data received successfully",
        user: req.body
    })
}
module.exports.updateUser = async function updateUser(req, res) {
    console.log('req.body->', req.body);

    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({
        email: 'abc@gmail.com'
    },
        dataToBeUpdated);

    // for(key in req.body){
    //     user[key] = req.body[key];
    // }

    res.json({
        message:"data updated successfully"
    })
}
module.exports.deleteUser = async function deleteUser(req, res) {
    // user = {};
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete({
            // email: 'aman123@gmail.com'
            dataToBeDeleted
        }
    )
    res.json({
        message: "data has been deleted",
        deletedUser: user
    })
}
module.exports.getUserById = function getUserById(req, res) {
    console.log(req.params.username);
    // console.log(req.params);
    let paramId = req.params.id;
    let obj = {};
    for(let i=0; i<user.length; i++) {
        if(user[i]['id']==paramId) {
            obj = user[i];
        }
    }
    res.json({
        message: "request received",
        data: obj
    });
}
module.exports.setCookies = function setCookies(req, res) {
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.cookie('isLoggedIn', false, {
        maxAge: 10000*60*60*24,
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