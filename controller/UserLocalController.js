const express =require('express');
const passport =require('passport');
const bcrypt=require('bcrypt-nodejs');
const facebookStrategy =require('passport-facebook').Strategy;
const localStrategy =require('passport-local').Strategy;
const User = require('../models/userModel.js');
const UserFb =require('../models/userFaceBookModel.js');
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

  await bcrypt.hash(req.body.password, null, null, async (err, hash) => {
      const users={
       email:  req.body.email,
       name:   req.body.username,
       password: hash
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
});

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

exports.authenPassport =(req,res,next) =>{
  passport.use(new localStrategy(
     async (username,password,done) =>{
        await User.findOne({name:username},async(err,user)=>{
          if(!user){
            return  done(null,false,{message:'Incorrect UserName'});

          }
          else{
               await bcrypt.compare(password, user.password,(err,result)=>{
                    if(user && result){
                      arrUser=user;
                    return done(null,user);
                    }
                    else{
                        return  done(null,false,{message:'Incorrect password'});
                    }
              })
            }
                     return done(err);
          });
        }
 ));
    next();
}
exports.authenPassportWithFaceBook = passport.authenticate('facebook',
     {scope:['email']}
);

exports.authenPassportWithFaceBookCallBack =passport.authenticate('facebook',{

  successRedirect:'/messenger',
  failureRedirect:'/login',
  profileFields:['id','displayName','email']
});



passport.use(new facebookStrategy({
  clientID: process.env.ID_APP_FACEBOOK,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
(accessToken, refreshToken, profile, done)=>{
      console.log(profile);
     return done(null,profile);
      //  await UserFb.findOrCreate({})
 }

)
);
//  next();
//}

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
