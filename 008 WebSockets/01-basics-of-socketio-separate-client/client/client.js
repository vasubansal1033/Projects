const URL = "http://localhost:3000";

const socketClient = io.connect(URL);

socketClient.on('serverToClient', (data) => {
    console.log(data.message)
})

socketClient.emit('clientToServer', {
    "message": "Hello server!"
})

const helloButton = document.querySelector("#helloBtn");
helloButton.addEventListener('click', (e) => {
    socketClient.emit('clientToClient', {
        "message": "Hello fellow client!"
    })
})

const paragraphTarget = document.querySelector(".target1");
socketClient.on('message', (data) => {
    paragraphTarget.innerHTML = data.message 
})

const clientInfo = document.querySelector(".target2")
socketClient.on('clientBroadcast', (data) => {
    clientInfo.innerHTML = data.message
})

socketClient.on('newClientConnected', (data) => {
    console.log(data.message);
})

