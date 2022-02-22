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
const vasuNamespace = io.of('/vasuNamespace')

// whenever someone connects
vasuNamespace.on('connection', function (socket) {
    console.log('Someone connected');
    vasuNamespace.emit('helloMessage', {
        message: 'Hello boi!'
    })
    socket.on('disconnect', function() {
        console.log('Someone disconnected')
    })

})