const path =require('path');
const dotenv = require('dotenv').config({path:'./config.env'});
const app =require('./app.js');
const mongoose =require('mongoose');
const server = require('http').Server(app);
const io =require('socket.io')(server);
const port =process.env.PORT;
const strConnect =process.env.DATABASE
.replace('{PASSWORD}',process.env.PASSWORD)
.replace('{USERNAME}',process.env.USERNAME);

mongoose.connect(strConnect,
  { useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(()=>console.log('db connect success'));

const db =mongoose.connection;

db.on('error',err=>{
  console.log('ERROR:');
  if(err.message ==='Authentication failed.')
  console.log('error connection string');
  else {
    console.log('Unspecified error: '+err.message);
  }
 process.exit(1);

});

io.on('connection',(socket)=>{
    console.log('a user connected');

     socket.on('create-room',(data)=>{
       console.log(data);
         socket.join(data);
         socket.Phong =data;
         console.log(socket.adapter.rooms);
     });
     socket.on('join-room',(data)=>{
       console.log(data);
         socket.join(data);
         socket.Phong =data;
            console.log(socket.adapter.rooms);
     });
     socket.on('client-server-message',(msg)=>{
           io.sockets.in(socket.Phong).emit('server-message-client',msg);
           console.log(msg);
     });

    socket.on('disconnect',()=>{
       console.log('user disconnected');
    });
});

server.listen(port,()=>console.log(`server on listen port : ${port}`));
