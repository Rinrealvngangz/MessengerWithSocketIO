const express =require('express');
const path =require('path');
const dotenv = require('dotenv').config({path:'./config.env'});
const passport =require('passport');
const mongoose =require('mongoose');
const app =express();
const port =process.env.PORT;
const strConnect =process.env.DATABASE
.replace('{PASSWORD}',process.env.PASSWORD)
.replace('{USERNAME}',process.env.USERNAME);

mongoose.connect(strConnect,
  { useNewUrlParser:true,useUnifiedTopology: true})
  .then(()=>console.log('db connect success'));

const db =mongoose.connection;

db.on('error',err=>{
  console.log('ERROR:');
  if(err.message =='Authentication failed.')
  console.log('error connection string');
  else {
    console.log('Unspecified error');
  }
 process.exit(1);

});

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.get('/messenger',(req,res)=>res.render('main'));
app.listen(port,()=>console.log(`server on listen port : ${port}`));
