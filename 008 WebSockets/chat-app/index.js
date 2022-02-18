const express = require('express');
const socketBackend = require('socket.io')
// App setup
const app = express();
const server = app.listen(3000, function () {
    console.log("Listening on port 3000")
});

// static files
app.use(express.static('public'));

// Socket setup
const io = socketBackend(server)

io.on('connection', function (socketBackend) {
    console.log('made socket connection', socketBackend.id);

    // wait for chat message, perform callback on data
    socketBackend.on('chat', function (data) {
        // send the data to all sockets
        // which are connected to our server
        io.sockets.emit('chat', data);
    })
    socketBackend.on('typing', function (data) {
        socketBackend.broadcast.emit('typing', data);
    })
})