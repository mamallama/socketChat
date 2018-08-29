const express = require('express');
const app = express();
const socket= require('socket.io');

const server = app.listen(4000, function() {
  console.log('listening on port 4000');
});

//static files
app.use(express.static('public'));


//socket setup
const io = socket(server);

io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);

  socket.on('chat', function(data) {
    //send to all sockets connected to server
    io.sockets.emit('chat', data);
  });

  //send to all sockets but the one typing
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

});
