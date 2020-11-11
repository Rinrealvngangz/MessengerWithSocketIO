const express =require('express');
const bodyParser =require('body-parser');
const path =require('path');
const passport =require('passport');
const flash =require('express-flash');
const session =require('express-session');
const loginRouter =require('./routes/loginRouter.js');
const signUpRouter= require('./routes/signUpRouter.js');
const messengerRouter =require('./routes/messengerRouter.js');
const app =express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(passport.initialize());
app.use(session({secret:'rinreal',
                 saveUninitialized:true,
                 resave:true
 }));
app.use(express.json());
app.use(flash());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));
app.use('/messenger',messengerRouter);
app.use('/login',loginRouter);
app.use('/signUp',signUpRouter);
module.exports = app;
