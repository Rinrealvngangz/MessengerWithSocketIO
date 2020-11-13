const express =require('express');
const UserLocal =require('../controller/UserLocalController.js');
const router = express.Router();

router.route('/').get(UserLocal.viewSignIn)
                       .post(UserLocal.authenPassport,
                             UserLocal.serializeUser,
                             UserLocal.deserializeUser,
                             UserLocal.signIn);
router.route('/auth/facebook').get(UserLocal.authenPassportWithFaceBook);
router.route('/auth/facebook/callback').get(UserLocal.authenFaceBook,UserLocal.authenPassportWithFaceBookCallBack);
module.exports =router;
