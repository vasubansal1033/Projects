const socket = io();
let socketId = socket.id;
console.log(`Got assigned id ${socketId}`)

socket.on('connect', () => {
    socketId = socket.id;
    console.log(`Connected to server`);
    console.log(`Got assigned id ${socketId}`);

    setTimeout(function () {
        socket.emit('clientToServer', {
            "id": socketId,
            "message": `Hello client!`
        })
    }, 2000)
    
})

socket.on('disconnect', () => {
    console.log(`Disconnected from server. Server went down.`);
})

socket.on('serverToClient', (data) => {
    console.log(`Message received from server -> ${data.message}`);
})

socket.on('chatNotification', (data) => {
    console.log(data);
})


// button to send chatMessage
const sendChatMessageBtn = document.querySelector(".messageBtn");
sendChatMessageBtn.addEventListener('click', (e) => {
    const from = document.querySelector("#from").value;
    const to = document.querySelector("#to").value;
    const message = document.querySelector("#message").value;

    socket.emit('chatMessage', {
        from: from,
        to: to,
        message: message
    }, function(message) {
        console.log(`Acknowledgment from server: ${message}`);
    })
})