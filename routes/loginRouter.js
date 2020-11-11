const express =require('express');
const UserLocal =require('../controller/UserLocalController.js');
const router = express.Router();

router.route('/').get(UserLocal.viewSignIn)
                       .post(UserLocal.authenPassport,
                             UserLocal.serializeUser,
                             UserLocal.deserializeUser,
                             UserLocal.signIn);

module.exports =router;
