const PORT = 3000;

const express = require('express');
const socketServer = require('socket.io');

const app = express();

const server = app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})

const io = socketServer(server, {
    cors: {
        origin: '*',
    }
});


let clients = 0;
io.on('connection', function(socket) {
    console.log("A user connected");
    clients++;

    socket.emit('serverToClient', {
        "message": "Hello Client!"
    })

    socket.broadcast.emit('newClientConnected', {
        "message": "New client connected. Say hello to them!"
    })

    socket.on('disconnect', () => {
        console.log("A user disconnected")
        clients--;
        io.sockets.emit("clientBroadcast", {
            "message": `${clients} have connected`
        })
    })

    socket.on('clientToServer', (data) => {
        console.log(data.message)
    })

    socket.on('clientToClient', (data) => {
        socket.broadcast.emit('serverToClient', data)
    })

    setTimeout(() => {
        socket.send({
            "message": "Paragraph tag changed after 4 seconds"
        })
    }, 4000)

    io.sockets.emit('clientBroadcast', {
        message: `${clients} have connected`
    })
    
})


