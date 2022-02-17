const express = require('express');
const app = express();

app.get('/vasu', function (req, res) {
    res.send('I am Vasu.');
})
app.get('/about', function (req, res) {
    // res.send('<h1>This is about page</h1>')

    // sending with relative path
    res.sendFile('./views/about.html', { root: __dirname });
});
app.get('/', function (req, res) {
    // with express, we do not have to care about
    // setHeaders or setting status codes.
    // res.send('<h1>Hello world!</h1>');

    // sending with absolute path
    res.sendFile("D:/Projects/003 Backend Development/nodejs-intro/views/index.html");
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

// 404 page
// use is a middleware function
// if route does not match with any of the above
// then this gets executed
app.use((req, res) => {

    // chaining
    res.status(404).sendFile('./views/404.html', { root: __dirname });

    // res.statusCode=404;
    // res.sendFile('./views/404.html', {root: __dirname});
})



app.listen(3000);