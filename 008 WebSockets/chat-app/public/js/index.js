const socket = io();

socket.on('connect', () => {
    const socketId = socket.id;
    console.log(`Connected to server`);
    console.log(`Got assigned id ${socketId}`)

})

socket.on('disconnect', () => {
    console.log(`Disconnected from server. Server went down.`);
})

socket.on('newMessage', (data) => {
    // console.log(data);
    const formattedDate = moment(data.createdAt).format('LT')
    let li = document.createElement('li');
    li.innerText = `${data.from} ${formattedDate}: ${data.text}`;

    document.querySelector(".chat-messages-container").appendChild(li);
})

socket.on('newLocMessage', (data) => {
    // console.log(data);
    const formattedDate = moment(data.createdAt).format('LT')
    let li = document.createElement('li');

    let a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', data.url);
    a.innerText = `${data.from}: My current location at ${formattedDate}`;

    li.appendChild(a);
    document.querySelector(".chat-messages-container").appendChild(li);
})

// button to send chatMessage
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = document.querySelector("#message").value;

    socket.emit('createMessage', {
        from: "user",
        text: message
    }, function() {

    });
})

// button to send location
const locBtn = document.querySelector("#send-loc-btn");
locBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(!navigator.geolocation) {
        alert("Your browser doesn't support geolocation");
    }

    navigator.geolocation.getCurrentPosition(
        (location) => {
            socket.emit('createLocMessage', {
                from: "user",
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        },
        (e) => {
            console.log(e);
        }
    )
})