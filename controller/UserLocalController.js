const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/userModel.js');

exports.viewSignUpUser = (req, res) => {
  try {
    res.render('signUp', {
      name: ''
    });

  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

}
exports.createUser = async (req, res) => {
  try {

    await bcrypt.hash(req.body.password, null, null, async (err, hash) => {
      const users = {
        email: req.body.email,
        name: req.body.username,
        password: hash
      }
      await User.findOne({
        name: users.name
      }, async (err, user) => {
        if (user)
          res.render('signUp', {
            name: 'Exists UserName ,please input username again!'
          });
        else {
          await User.create(users);
          console.log(users);
          res.redirect('/login');
        }
      })
    });

  } catch (err) {
    res.redirect('/signUp')
    console.log(err.message);
  }
}

exports.viewSignIn =(req, res) => {

     res.render('login');

  }
exports.signIn = passport.authenticate('local', {
  successRedirect: '/messenger',
  failureRedirect: '/login',
  failureFlash: true
})

exports.authenPassport = (req, res, next) => {
  passport.use(new localStrategy(
    async (username, password, done) => {
      await User.findOne({
        name: username
      }, async (err, user) => {
        if (!user) {
          return done(null, false, {
            message: 'Incorrect UserName'
          });

        } else {
          await bcrypt.compare(password, user.password, (err, result) => {
            if (user && result) {
              arrUser = user;
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'Incorrect password'
              });
            }
          })
        }
        return done(err);
      });
    }
  ));
  next();
}

exports.viewMessenger =(req, res) => {

    res.render('main', {
      name: req.user.name
    });

  }



exports.serializeUser = (req, res, next) => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  })
  next();
};

exports.deserializeUser = (req, res, next) => {
  passport.deserializeUser(function(user, done) {
      //User.findById(id, function(err, user) {
          done(null, user);

      //});
  })
next();
};
exports.checkAuthenticated =(req,res,next)=>{
     if(req.isAuthenticated()){
       return next();
     }
       res.redirect('/login');


}
exports.checkNotAuthenticated =(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/messenger');
    }
    next();

}
