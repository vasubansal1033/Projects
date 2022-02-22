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

// whenever someone connects
io.on('connection', function (socket) {

    console.log('User connected')
    socket.emit('helloMessage', {
        message: 'helloooo'
    })

})