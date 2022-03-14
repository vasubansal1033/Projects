const express = require('express');
const app = express();

// middleware to set public folder to display static files
app.use(express.static("public"));

// middleware to access information coming from forms
app.use(express.urlencoded({extended: true}));

// middleware to parse json data from body for post requests
app.use(express.json());

// views folder for EJS templating sites - 1
app.set("view engine", 'ejs');

// 2
// will work with every url
// app.use(logger1);
// app.use(logger3);
// app.use(logger2);

// root route will get displayed files from static (public folder hierarchy)

app.get('/new', (req, res) => {
    console.log('In get /');
 
    // res.render('index', { text: "'This is non-static site using EJS templating'" });
    res.render('test/bansal', { text: "This is bansal's site" });

});

// 2
// loggers only work with / route now
// middle-ware
// app.get('/', logger1, logger3, logger2, (req, res) => {
//     console.log('In get /');

//     res.render('index', { text: "Hello text" });
// });

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>');
})

// 2
// routers related user -> placed in userRouter.js
// app.get('/users', (req, res) => {
//     res.send("List of users");
// })

// app.get('/users/new', (req, res) => {
//     res.send("New user form")
// })

// 2
const userRouter = require('./routes/userRouter')
// app.use(userRouter);
app.use('/users', userRouter);

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

app.listen(3000);