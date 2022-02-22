// client script or frontend 
const socket = io();
// socket.on('message', function(data) {
//     document.write(data);
// })
socket.on('testEvent', function (data) {
    console.log(document.write(data.description))
})

setTimeout(function () {
    socket.emit('clientEvent', {
        message: 'Message from client'
    })
}, 4000)