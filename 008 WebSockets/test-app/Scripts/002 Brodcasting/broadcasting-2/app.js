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

var clients = 0;

// whenever someone connects
io.on('connection', function (socket) {

    clients++;
    socket.emit('newClientConnect', {
        message: 'Hey Welcome!'
    })
    socket.broadcast.emit('newClientConnect', {
        message: `Clients connected : ${clients}`
    })

    socket.on('disconnect', function() {
        clients--;
        socket.broadcast.emit('newClientConnect', {
            message: clients
        })
    })

})