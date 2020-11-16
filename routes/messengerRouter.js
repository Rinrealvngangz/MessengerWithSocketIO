const express =require('express');
const UserLocal =require('../controller/UserLocalController.js');
const router = express.Router();

router.route('/').get(UserLocal.checkAuthenticated,UserLocal.viewMessenger);

module.exports =router;
