const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const loginRouter = require('./routes/loginRouter.js');
const signUpRouter = require('./routes/signUpRouter.js');
const messengerRouter = require('./routes/messengerRouter.js');
const loginFbRouter = require('./routes/loginfbRouter.js');
const loginFbCallbackRouter = require('./routes/loginFbCallBackRouter.js');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_SESSION,
  saveUninitialized: true,
  resave: true,
  cookie: { 
    maxAge:60*1000*5 }
}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/messenger', messengerRouter);
app.use('/login', loginRouter);
app.use('/auth/facebook', loginFbRouter);
app.use('/auth/facebook/callback', loginFbCallbackRouter);
app.use('/signUp', signUpRouter);
module.exports = app;
