console.log("Javascript loaded")

const clientSocket = io.connect("http://localhost:3000/vasu-namespace", {
});

clientSocket.on('connect', () => {
    console.log("Connected to vasu-namespace")
})

clientSocket