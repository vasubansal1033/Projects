const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocMessage } = require('./utils/message');

const PUBLIC_PATH = path.join(__dirname, '/../public');
const PORT = process.env.PORT ||  '3000';

const app = express();
const server = http.createServer(app);

let username, room;
app.get("/chat", (req, res, next) => {
    username = req.query.name
    room = req.query.room
    express.static(PUBLIC_PATH, { extensions: ['html'] })(req, res, next);
})

app.use(express.static(PUBLIC_PATH, { extensions: ['html'] })); 

const io = socketIO(server);
io.on('connection', (socket) => {
    console.log(`User with id ${socket.id} connected`);

    socket.emit('newMessage', generateMessage('admin', `Welcome to the chatapp room`,))

    socket.broadcast.emit('newMessage', generateMessage('admin','New user joined'))

    socket.on('createMessage', (message, cb) => {
        console.log("createMessage", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    })

    socket.on('createLocMessage', (message) => {
        io.emit('newLocMessage', generateLocMessage(message.from, message.latitude, message.longitude));
    })

    socket.on('disconnect', () => {
        console.log(`User with id ${socket.id} disconnected`)
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
