const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Add this line to use path module

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html')); // Use path.join for file paths
});

// Add a route for chat.html
app.get('/chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/chat.html')); // Serve chat.html when requested
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

