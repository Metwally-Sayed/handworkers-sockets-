const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('userId: ' + socket.id);

  socket.on('sendData', (data) => {
    console.log(data);
    io.emit('sendData', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log('server is listening on 3001');
});
