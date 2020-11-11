const express =require('express');
const passport =require('passport');


const localStrategy =require('passport-local').Strategy;
const User = require('../models/userModel.js');
let arrUser={};
exports.viewSignUpUser =(req,res)=>{
      try{
           res.render('signUp',{name:''});

      }catch(err){
        console.log(`ERROR: ${err.message}`);
      }

}
exports.createUser = async (req,res)=>{
  try{

    const users={
     email:  req.body.email,
     name:   req.body.username,
     password: req.body.password
   }

    await  User.findOne({name:users.name}, async (err,user)=>{
          if(user)
            res.render('signUp',{name:'Exists UserName ,please input username again!'});
          else{
            await User.create(users);
              console.log(users);
          res.redirect('/login');
          }


 })
}
catch(err){
    res.redirect('/signUp')
   console.log(err.message);
 }
}

exports.viewSignIn =(req,res)=>{
    res.render('login');
}
exports.signIn = passport.authenticate('local',{
      successRedirect:'/messenger',
      failureRedirect:'/login',
      failureFlash:true
   })

exports.authenPassport =(req,res,next) =>{ passport.use(new localStrategy(
     async(username,password,done) =>{
        await User.findOne({name:username},(err,user)=>{
          if(!user){
            return  done(null,false,{message:'Incorrect username'});

          }
          if(user && user.password ===password){
              arrUser=user;
            return done(null,user);

          }
          return done(err);

        }
  )
}
))
  next();
}

exports.viewMessenger=(req,res)=>{
     res.render('main',{name:arrUser.name});
   }

exports.serializeUser =(req,res,next)=>{passport.serializeUser(function(user, done) {
  done(null, user.id);
})
  next();
};

exports.deserializeUser =(req,res,next)=>{ passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
})
  next();
};
