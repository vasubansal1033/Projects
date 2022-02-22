const express = require('express')
const app = express();
const socketBackend = require('socket.io');

const server = app.listen(3000, function () {
    console.log('listening on port 3000')
})

app.get('/', function (req, res) {
    res.sendFile('./index.html', { root: __dirname });
})

const io = socketBackend(server);

let roomNo = 1;
// whenever someone connects
io.on('connection', function (socket) {

    socket.join(`room-${roomNo}`);
    // send event to everyone in this room
    io.sockets.in(`room-${roomNo}`).emit('connectToRoom', {
        message: `You are in room ${roomNo}`
    })

    // setTimeout(function() {
    //     socket.leave(`room-${roomNo}`);
    // }, 4000)

})