const path =require('path');
const dotenv = require('dotenv').config({path:'./config.env'});
const app =require('./app.js');
const mongoose =require('mongoose');

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

app.listen(port,()=>console.log(`server on listen port : ${port}`));
