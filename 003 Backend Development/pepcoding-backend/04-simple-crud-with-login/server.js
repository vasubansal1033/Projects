const express = require('express');
const app = express();

const PORT = 3000;

let users = [];
users.push({ "id": 1, "name": "Vasu" });
users.push({ "id": 2, "name": "Parv" });
users.push({ "id": 3, "name": "Bonda" });

app.use(express.json());

const userRouter = express.Router();
app.use("/user", userRouter);

const authRouter = express.Router();
app.use("/auth", authRouter);

authRouter
    .route("/signup")
    .get(middleware1, getSignup, middleware2)
    .post(postSignup)

userRouter
    .route("/")
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/by_id_age")
    .get(getUserByIdAge)

// User router
function getUser(req, res) {
    const id = req.body.id;
    // const id = req.params.id;

    const user = users.find(u => u.id == id);

    if (user) {
        return res.json({
            success: true,
            message: `User with id ${id} found`,
            data: user
        })
    }

    res.json({
        success: false,
        message: `User with id ${id} not found`,
        data: NaN
    })
}

function createUser(req, res) {
    const user = req.body;

    const u = users.find(u => u.id == user.id)
    if (u) {
        return res.json({
            "success": false,
            "message": `User with id ${user['id']} already exists`
        })
    }

    user['id'] = req.body['id'];
    if (!user['id']) {
        user['id'] = users.length + 1;;
    }

    users.push(user);

    res.json({
        "success": true,
        "message": `User with id ${user['id']} added`,
    })
}

function updateUser(req, res) {

    const body = req.body;
    const id = body.id;

    const u = users.find(user => user.id == id);
    if (!u) {
        return res.json({
            "success": false,
            "message": `User with id ${id} does not exist`
        })
    }

    for (let key in body) {
        u[key] = body[key];
    }

    res.json({
        "success": true,
        "message": `User with id ${id} updated successfully`
    })

}

function deleteUser(req, res) {

    const id = req.body.id;

    const u = users.find(user => user.id == id);
    if (!u) {
        return res.json({
            "success": false,
            "message": `User with id ${id} does not exist`
        })
    }

    users = users.filter(user => user.id != id);
    res.json({
        "success": true,
        "message": `User with id ${id} deleted successfully`
    })
}

function getUserByIdAge(req, res) {
    const query_obj = req.query;
    const user = users.find(u => u['id'] == query_obj['id'] && u['name'] == query_obj['name'])

    let success = true;
    let message = "";
    if (!user) {
        success = false;
        message = `User not found`;
    } else {
        message = `User found`;
    }

    res.json({
        "success": success,
        "message": message,
        "user": user
    })
}

// Auth router 
function getSignup(req, res, next) {
    console.log("Inside signup");
    next();
    console.log("Back in signup");

    res.sendFile("./views/signup.html", { root: __dirname });
}

function postSignup(req, res) {
    console.log("Received request in backend");
    console.log(req.body);

    const body = req.body;

    const email = body.email;
    const name = body.name;
    const password = body.password;
    const confirmPassword = body.confirmPassword;

    const newUser = {
        "id": users.length + 1,
        "email": email,
        "name": name,
        "password": password
    }

    users.push(newUser);

    res.json({
        "success": true,
        "message": "User signed up",
        "user": newUser
    })
}

function middleware1(req, res, next) {
    console.log("Encountered middleware 1");
    next();
}

function middleware2(req, res, next) {
    console.log("Encountered middleware 2");
}

app.listen(PORT)