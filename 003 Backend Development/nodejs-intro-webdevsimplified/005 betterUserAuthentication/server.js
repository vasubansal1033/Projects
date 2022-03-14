// to set all the environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

// overriding post for logout
// delete request is provided by Postman and other request apis
// browser form submissions do not support that
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)


const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// after successful redirect from post request we will get here
// passport automatically takes care of modifying req to add user
app.get('/', checkAuthenticated, (req, res) => {

    // console.log(req.user);
    // console.log(req.user.name);
    res.render('index.ejs', {
        name: req.user.name
    });
})

app.get('/users', (req, res) => {
    console.log(users);
    res.send();
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', (req, res) => {
    res.render('register.ejs');
})
app.post('/register', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = {
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
        users.push(user);
        // console.log(user);

        res.redirect('/login');

    } catch (err) {
        console.log(err);
        res.redirect('/register')
    }

})

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

function checkAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    next();
    return;
}

app.listen(3000);