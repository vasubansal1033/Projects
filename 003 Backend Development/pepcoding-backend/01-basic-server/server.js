const http = require('http');
const fs = require('fs');

const PORT_NUMBER = 3000;
const HOST = "localhost";
const CONTENT_TYPE = "text/html";

const HOME_PAGE_PATH = "/index.html";
const ABOUT_PAGE_PATH = "/about.html";
const ERROR_PAGE_PATH = "/error_page.html";

const STATUS_CODES = {
    SUCCESS: 200,
    PAGE_NOT_FOUND: 404,
    PAGE_REDIRECT: 301
}

const server = http.createServer((req, res) => {
    // console.log(req);

    res.setHeader('Content-Type', CONTENT_TYPE);

    let VIEW_PATH = "./views";
    REQUEST_PATH = req.url;
    switch(REQUEST_PATH) {
        case "/":
            VIEW_PATH += HOME_PAGE_PATH;
            res.statusCode = STATUS_CODES.SUCCESS;
            break;
        case "/about":
            VIEW_PATH += ABOUT_PAGE_PATH;
            res.statusCode = STATUS_CODES.SUCCESS;
            break;
        case "/about_me":
            res.statusCode = STATUS_CODES.PAGE_REDIRECT;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            VIEW_PATH += ERROR_PAGE_PATH;
            res.statusCode = STATUS_CODES.PAGE_NOT_FOUND;
            break;
    }

    fs.readFile(VIEW_PATH, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            console.log('File read sucessfully');
            res.write(data);
            res.end();
        }
    })

})

server.listen(PORT_NUMBER, HOST, () => {
    console.log(`Server is listening on port ${PORT_NUMBER}`);
});