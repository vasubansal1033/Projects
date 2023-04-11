const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PUBLIC_PATH = path.join(__dirname, '/../public');
const PORT = process.env.PORT ||  '3000';

const app = express();
const server = http.createServer(app);
app.use(express.static(PUBLIC_PATH)); 

const io = socketIO(server);
io.on('connection', (socket) => {
    console.log(`User with id ${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`User with id ${socket.id} disconnected`);
    })

    socket.on('clientToServer', (data) => {
        console.log(`Received data from ${data.id}`);
        console.log(`message -> ${data.message}`);

        setTimeout(function() {
            socket.emit('serverToClient', {
                "message": "Message received!"
            });
        }, 2000);
    })

    socket.on('chatMessage', (data, cb) => {
        // io.emit('chatNotification', {
        //     from: data.from,
        //     to: data.to,
        //     message: data.message,
        //     createdAt: new Date().getTime()
        // })
        cb(`Data received`);
        socket.broadcast.emit('chatNotification', {
            from: data.from,
            to: data.to,
            message: `Message was sent.`
        })
    })


    // setTimeout(function() {
    //     socket.emit('serverToClient', {
    //         "message": "Hey client!"
    //     });
    // }, 4000);
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
