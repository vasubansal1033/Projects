const http = require('http');
const port = 3000;
const fs = require('fs');


const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write("Error: File not found");
        } else {
            res.write(data);
        }
        res.end();
    })
    // res.write('<h1>Hello world</h1>');
    // res.write(' Vasu');
    // res.end();

});

server.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Listening on port ${port}`);
    }
})