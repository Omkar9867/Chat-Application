//Client
const socket = io('http://localhost:3000', {reconnect: true});
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

const username = prompt('What is your name?')
appendMessageHandler('You Joined', true);

socket.emit('new-user', username);

socket.on('chat-message', data => {
    isCurrentUser = data.name === username
    appendMessageHandler(`${data.name}: ${data.message}`, isCurrentUser);
});

socket.on('user-connected', uname => {
    appendMessageHandler(`${uname} connected`, false);
});

socket.on('user-disconnected', uname => {
    appendMessageHandler(`${uname} disconnected`, false)
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessageHandler(`You: ${message}`, true);
    socket.emit('send-chat-message', message); //=> Emit Passes inforfmation here form client to server
    messageInput.value = '';
    messageInput.focus();
});


//Main Function to display message
function appendMessageHandler (message, isCurrentUser)  {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(isCurrentUser ? 'sender-message' : 'receiver-message')
    messageContainer.append(messageElement)
}

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});