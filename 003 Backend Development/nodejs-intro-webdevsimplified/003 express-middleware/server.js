const express = require('express');
const app = express();

// global middleware
// app.use(logger);

// anonymous function is also a middleware
// most of the time it gets executed during the end of req-res cycle
// so dont put next here

app.get('/', (req, res) => {
    console.log("Home page");
    res.send("<h1>Hello world!</h1>");
    // next();
})

// middleware specific to an action
// app.get('/', logger, (req, res) => {
//     console.log("Home page");
//     res.send("<h1>Hello world!</h1>")
// })

app.use(logger);

app.get("/users", auth, (req, res)=>{
    if(req.isAdmin) {
        console.log("Users page")
        res.send("Users page")
    } else {
        res.send("Not authorized again");
    }
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Listening to port 3000")
});

// middleware
function logger(req, res, next) {
    console.log("I am logging");
    // console.log("Before next")
    // console.log(req.originalUrl);    
    next();
    // console.log("After next");
    // res.send("Response sent from middleware");
}
function auth(req, res, next) {

    if(req.query.role==="admin") {
        console.log("Authentication successful");
        req.isAdmin = true;
        next();
    } else {
        console.log("Not authorized");
        next();
        // res.send("Not authorised to pass");
    }

}