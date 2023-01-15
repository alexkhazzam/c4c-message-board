const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const socket = require('socket.io');

const { postSaveMessage } = require('./api/saveMessage');
const { readMessages } = require('./helpers/messageWorker');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (_req, res, _next) => {
  readMessages(messages => res.render('index.ejs', { messages }));
});
app.post('/save-message', postSaveMessage);

const server = app.listen(PORT, () =>
  console.log(`Listening to requests on port ${PORT}`)
);

const io = socket(server);

io.on('connection', socket => {
  socket.on('newMessage', newMessage => {
    io.emit('broadcastMessage', newMessage);
  });
});
