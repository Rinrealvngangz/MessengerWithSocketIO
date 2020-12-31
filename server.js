const path = require('path');
const dotenv = require('dotenv').config({
  path: './config.env'
});
const app = require('./app.js');
const mongoose = require('mongoose');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require('express');
const Room = require('./models/roomModel.js');
const port = process.env.PORT;
const strConnect = process.env.DATABASE
  .replace('{PASSWORD}', process.env.PASSWORD)
  .replace('{USERNAME}', process.env.USERNAME);

mongoose.connect(strConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('db connect success'));

const db = mongoose.connection;

db.on('error', err => {
  console.log('ERROR:');
  if (err.message === 'Authentication failed.')
    console.log('error connection string');
  else {
    console.log('Unspecified error: ' + err.message);
  }
  process.exit(1);

});

io.on('connection', (socket) => {

  const socketId = socket.id;
  console.log('a user connected:' + socket.id);

  socket.on('create-room', (data) => {
    socket.join(data.id);
    socket.Phong = data.id;
    socket.to(socket.Phong).emit('client-Join-Room', data.mess);
  });

  socket.on('client-server-message', async (obj) => {

    console.log(obj);
    const filter = {
      name: obj.name,
      content: obj.nd,
      dateSend: obj.date
    }
    await Room.findOne({
      id: obj.id
    }, async (err, result) => {
      if (result) {
        result.message.push(filter);
        await result.save((err, item) => {
          const idMessage = item.message[item.message.length - 1]._id;
          obj.idMess = idMessage;
          socket.to(socket.Phong).emit('server-message-client', obj);
          io.to(`${socketId}`).emit('server-send-myData', obj);

        });

      }
      if (err) {
        console.log(err);
      }
    });
  });
  socket.on('client-send-delete', async (data) => {

    const idMessage = data.idContent;
    await Room.updateOne({
      id: data.idRoom
    }, {
      $pull: {
        message: {
          _id: {
            $in: [idMessage]
          }
        }
      }
    });
    socket.to(socket.Phong).emit('server-send-idDeleteMessage', idMessage);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => console.log(`server on listen port : ${port}`));
