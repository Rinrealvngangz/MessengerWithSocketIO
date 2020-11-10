const express =require('express');
const path =require('path');
const passport =require('passport');
const mongoose =require('mongoose');
const port =3000;
const app =express();


mongoose.connect(
  `mongodb+srv://${nguyenmautuan}:${0949238337}@cluster0.ndtch.mongodb.net/test`
  ,{ userNewUrlParser:true,useUnifiedTopology: true});

const db =mongoose.connection.then(()=>console.log('db connect success'););

db.on('error',(err)=>console.log(err.message););


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.get('/messenger',(req,res)=>res.render('main'));
app.listen(port,()=>console.log(`server on listen port : ${port}`));
