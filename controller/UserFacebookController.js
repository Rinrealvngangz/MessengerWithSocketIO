const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const UserFb = require('../models/userFaceBookModel.js');


exports.authenFacebook = (req, res, next) => {
  passport.use(new facebookStrategy({
      clientID: process.env.ID_APP_FACEBOOK,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'email', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
      await UserFb.findOne({
        id: profile._json.id
      }, (err, user) => {
        //console.log(profile);
        if (!user) {

          const userfb = new UserFb({
            id: profile._json.id,
            name: profile._json.name,
            email: profile._json.email,
            photo: profile.photos[0].value
          });
          userfb.save(err => {
            if (err) {
              console.log(err.message)

            } else {
              return done(null, userfb);
            }
          });

        } else {

          return done(null, user);
        }
        if (err) return done(err);

      });

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
    done(null, user);
  })
  next();
};

exports.deserializeUser = (req, res, next) => {
  passport.deserializeUser(function(user, done) {
    //UserFb.findOne({
      //id
    //}, function(err, user) {
      done(null, user);
    //});
  })
  next();
};
exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/messenger');
  }
  next();

};
