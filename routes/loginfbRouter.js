const express =require('express');
const router =express.Router();
const UserLocal =require('../controller/UserLocalController.js');
router.route('/').get(UserLocal.authenPassportWithFaceBook,
                      UserLocal.serializeUser,
                      UserLocal.deserializeUser
                     );

module.exports =router;
