// make connection to server
// this io is in the socket.io library
const socketFrontend = io.connect('http://localhost:3000');

// Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// emit event
btn.addEventListener('click', function() {
    socketFrontend.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

message.addEventListener('keypress', function() {
    socketFrontend.emit('typing', `${handle.value}`)
})

// listen for events
socketFrontend.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle} : ${data.message}</strong></p>`
})

socketFrontend.on('typing', function(data) {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})