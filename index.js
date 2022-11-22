const express = require('express');
const app = express();
const port = 5000;

const server = app.listen(5000, () => {
  console.log('listening on *:5000');
});



 app.get('/', (req, res) => {
   res.send('Welcome to out chat room');
 });

const io = require('socket.io')(server);


io.on('connection', (socket) => {
  const name = socket.handshake.query.name
  socket.on('message', (data) => {
    const message = {
      message: data.message,
      senderName: name,
      sentAt: Date.now()
    }
    io.emit('message', message)

  })
});

