const express = require('express');
const router = express.Router();
// router is like a mini app
// on its own

// router.get('/users', (req, res) => {
//     res.send("List of users");
// })

// router.get('/users/new', (req, res) => {
//     res.send("New user form")
// })

router.use(logger1);
router.use(logger3);
router.use(logger2);

router.get('/', (req, res) => {
    // http://localhost:3000/users?fname=vasu&lname=bansal
    console.log(`First name is ${req.query.fname} and Last Name is ${req.query.lname}`);
    res.send("List of users");
})

router.get('/new', (req, res) => {
    // res.send("New user form")
    res.render("users/new", {firstName: 'TestName'});
})

const users = [];
router.post('/', (req, res) => {
    const isValid = true;
    if(isValid) {
        users.push({firstName: req.body.firstName});
        let userId = users.length - 1;
        res.redirect(`/users/${userId}`)
    } else {
        console.log("Error");
        res.status(404).send("<h1>Error: not valid request</h1>")
    }
    // console.log(req.body.firstName);
    // res.send('User created');
})

// dynamic route
// place below so that wont interfere with static routes

// router.get('/:userId', (req, res) => {
//     res.send(`Current user is ${req.params.userId}`);
// })
// router.post('/:userId', (req, res) => {
//     res.send(`Current user is ${req.params.userId}`);
// })
// router.delete('/:userId', (req, res) => {
//     res.send(`Current user is ${req.params.userId}`);
// })

// mounting
router
    .route('/:userId')
    .get((req, res) => {
        res.send(`Current user is ${req.params.userId}`);
    })
    .post((req, res) => {
        res.send(`Current user is ${req.params.userId}`);
    })
    .delete((req, res) => {
        res.send(`Current user is ${req.params.userId}`);
    })

// req.param middleware
// deprecated
// router.param((req, res, next, id) => {
//     console.log(`User id is ${id}`);
//     next();
// })


function logger1(req, res, next) {
    console.log(`Logger1: ${req.originalUrl}`);
    next();
}

function logger2(req, res, next) {
    console.log(`Logger2: ${req.originalUrl}`);
    next();
}

function logger3(req, res, next) {
    console.log(`Logger3: ${req.originalUrl}`);
    next();
}

module.exports = router;