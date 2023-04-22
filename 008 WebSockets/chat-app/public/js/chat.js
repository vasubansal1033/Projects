const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get("name");
const room = urlParams.get("room");


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

    document.querySelector(".messages").appendChild(li);
    scrollToLatestMessage();
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
    document.querySelector(".messages").appendChild(li);
    scrollToLatestMessage();
})

// button to send chatMessage
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = document.querySelector("#message").value;

    socket.emit('createMessage', {
        from: userName,
        text: message
    }, function () {

    });
})

// button to send location
const locBtn = document.querySelector("#send-loc-btn");
locBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
        alert("Your browser doesn't support geolocation");
    }

    navigator.geolocation.getCurrentPosition(
        (location) => {
            socket.emit('createLocMessage', {
                from: userName,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        },
        (e) => {
            console.log(e);
        }
    )
})

function scrollToLatestMessage() {
    let lastMessage = document.querySelector(".messages").lastElementChild;
    lastMessage.scrollIntoView();
}