const express =require('express');
const UserLocal =require('../controller/UserLocalController.js');
const router = express.Router();

router.route('/').get(UserLocal.viewSignUpUser).post(UserLocal.createUser);

module.exports =router;
