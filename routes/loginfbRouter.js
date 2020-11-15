const express =require('express');
const router =express.Router();
const UserLocal =require('../controller/UserLocalController.js');
router.route('/').get(UserLocal.authenFacebook,
  UserLocal.serializeUser,
  UserLocal.deserializeUser,
  UserLocal.authenPassportWithFaceBook,

                     );

module.exports =router;
