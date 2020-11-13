const express =require('express');
const router =express.Router();
const UserLocal =require('../controller/UserLocalController.js');

router.route('/').get(UserLocal.authenPassportWithFaceBookCallBack);

module.exports = router;
