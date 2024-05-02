const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { sendVerificationEmail } = require('./mailer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

const users = {
  'godester': { password: 'saba', email: 'acompleteoutplay@gmail.com', code: null },
  'dyl': { password: 'dog', email: 'dyl@example.com', code: null }
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    const code = Math.floor(100000 + Math.random() * 900000);
    user.code = code;
    sendVerificationEmail(user.email, code);
    res.json({ message: "Verification code sent to your email." });
  } else {
    res.status(401).send({ message: "Invalid credentials." });
  }
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
