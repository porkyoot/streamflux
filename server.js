
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let overlayState = {
  weight: '???',
  fullness: 0,
  food: []
};

io.on('connection', (socket) => {
  socket.emit('update', overlayState);

  socket.on('setState', (state) => {
    overlayState = state;
    io.emit('update', overlayState);
  });
});

app.use(express.static('public'));

server.listen(3000, () => {
  console.log('Overlay system running on http://localhost:3000');
});
