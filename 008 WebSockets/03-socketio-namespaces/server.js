const express = require('express');
const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

app.use(express.static('public'))
app.get("/home", (req, res) => {
    res.sendFile("public/index.html", {
        root: __dirname
    })
})

const serverSocket = require('socket.io');
const io = serverSocket(server, {
    cors: {
        origin: '*',
    },
    // transports: ["socket"],
    // path: "/myapp/socket"
});

const namespaceSocket = io.of("/vasu-namespace");
namespaceSocket.on('connection', (socket) => {
    console.log(`A user connected with id ${socket.id}`);

    socket.on('disconnect', () => {
        namespaceSocket.emit('clientToServer', {
            'message': `User with id ${socket.id} disconnected`
        })
    })
})

