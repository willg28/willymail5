const socket = new WebSocket('socket.io'); // Replace 'ws://localhost:3000' with your WebSocket server URL

socket.onopen = () => {
    console.log('Connected to the server.');
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    displayMessage(data.message);
};

socket.onclose = () => {
    console.log('Connection closed.');
};

socket.onerror = (error) => {
    console.error('Error in connection:', error);
};

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (message !== "") {
        socket.send(JSON.stringify({ message }));
        displayMessage(message, true);
        messageInput.value = "";
    }
}

function displayMessage(message, isOwnMessage = false) {
    const chatContainer = document.getElementById("chat-container");
    const newMessage = document.createElement("div");
    newMessage.textContent = message;

    if (isOwnMessage) {
        newMessage.classList.add('own-message');
    }

    chatContainer.appendChild(newMessage);
}

// You can add any additional client-side logic or modifications here

