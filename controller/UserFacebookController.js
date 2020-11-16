const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const UserFb = require('../models/userFaceBookModel.js');


exports.authenFacebook = (req, res, next) => {
  passport.use(new facebookStrategy({
      clientID: process.env.ID_APP_FACEBOOK,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'email','photos']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      console.log(profile.photos[0].value);
      return done(null, profile);
      //  await UserFb.findOrCreate({})
    }

  ));
  next();
}
exports.authenPassportWithFaceBook = passport.authenticate('facebook', {
  scope: ['email']
});

exports.authenPassportWithFaceBookCallBack = passport.authenticate('facebook', {

  successRedirect: '/messenger',
  failureRedirect: '/login',

});

exports.serializeUser = (req, res, next) => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })
  next();
};

exports.deserializeUser = (req, res, next) => {
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  })
  next();
};
