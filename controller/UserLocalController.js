const express =require('express');
const passport =require('passport');
const localStrategy =require('passport-local').Strategy;
const User = require('../models/userModel.js');
let arrUser={};
exports.viewSignUpUser =(req,res)=>{
      try{
         res.render('signUp');

      }catch(err){
        console.log(`ERROR: ${err.message}`);
      }

}
exports.createUser =async(req,res)=>{
   const user={
   email: await req.body.email,
    name: await req.body.username,
    password:await req.body.password
  }
  if(user!==null){
     await  User.create(user);
      console.log(user);
  }else{
    console.log('error');
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
            return done(null,user,{message:`Welcome ${user.username}`});

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
