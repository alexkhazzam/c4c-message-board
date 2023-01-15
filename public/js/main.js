const emptyMessagesText = document.getElementById('empty-messages-text');
const socket = io();

socket.on('broadcastMessage', ({ filteredMessage, date }) => {
  createMessage(filteredMessage, date);
  if (emptyMessagesText) {
    emptyMessagesText.style.display = 'none';
  }
});

(async () => {
  const welcomeText = document.getElementById('welcome-text');
  const text = 'Welcome to Message Board!';

  for (let i = 0; i < text.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 40));
    welcomeText.textContent += text[i];
  }
})();

const createMessage = (messageText, date) => {
  const messages = document.getElementById('messages');
  const message = document.createElement('div');
  message.className = 'message-wrapper';
  message.innerHTML = `
    <p class="date">${date}</p>
    <p class="message">${messageText}</p>
  `;
  messages.prepend(message);
};

const messageHandler = () => {
  const message = document.getElementById('message-input');

  fetch('/save-message', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      message: message.value.trim(),
      date: Date().toString().split(' GMT')[0],
    }),
  })
    .then(async res => {
      const { filteredMessage, date } = await res.json();
      socket.emit('newMessage', { filteredMessage, date });
    })
    .finally(() => {
      if (emptyMessagesText) {
        emptyMessagesText.style.display = 'none';
      }
      message.value = '';
    });
};
