const express = require('express');
const router = express.Router();
const UserFb = require('../controller/UserFacebookController.js');
router.route('/').get(UserFb.authenFacebook,
  UserFb.serializeUser,
  UserFb.deserializeUser,
  UserFb.authenPassportWithFaceBook,

);

module.exports = router;
