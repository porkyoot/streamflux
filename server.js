const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use('/public', express.static('public'));

// Serve HTML pages manually
app.get('/overlay.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'overlay.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// WebSocket logic
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

server.listen(3000, () => {
  console.log('Overlay system running on http://localhost:3000');
});
