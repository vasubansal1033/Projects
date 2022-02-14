// server creation

// 1. http module
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{
    console.log("Request has been made from browser to server");
    // console.log(req.method);
    // console.log(req.url);

    let num = _.random(0, 20);
    console.log(num);

    // function greet() {
    //     console.log('hello world!');
    // }
    let greet = _.once(()=>{
        console.log('hello world!');
    });

    greet();
    greet();

    // res.setHeader('Content-Type', 'text-plain');

    let path = './views/';
    switch (req.url) {
        case '/':
            path+='index.html';
            // res.statusCode=200
            break;
        case '/about':
            path+='about.html';
            break;
        case '/about-me':
            // /about-me is getting redirected to /about
            res.statusCode=301; // status code for redirect
            res.setHeader('Location', '/about');
            // res.end();
            // path+='about.html';
            break;


        default:
            path+='404.html';
            res.statusCode=404;
            break;
    }

    res.setHeader('Content-Type', 'text-html');
    // res.write('<h1>Hello world!</h1>');
    // res.write('<h2>My name is Vasu</h2>');
    fs.readFile(path, (err, fileData)=>{
        if(err) {
            console.log(err);
        } else {
            res.write(fileData);
            res.end();
        }
    });

});

// portnumber, host, call-back function
server.listen(3000, 'localhost', ()=>{
    console.log("Server listening on port 3000");
});