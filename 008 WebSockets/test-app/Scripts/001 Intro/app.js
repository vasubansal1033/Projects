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

    console.log('A user connected', socket.id)

    // send message from server to client after timeout 
    // setTimeout(function() {
    //     socket.send('Message from server after 4 seconds')
    // }, 4000);

    // sending an object when emitting an event
    setTimeout(function() {
        socket.emit('testEvent', {
            description: 'A custom event'
        });
    }, 2000)

    // when disconnect happens
    socket.on('disconnect', function () {
        console.log("A user disconnected");
    })

    socket.on('clientEvent', function(data) {
        console.log(data.message)
    })

})