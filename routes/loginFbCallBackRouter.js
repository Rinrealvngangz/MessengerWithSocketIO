const express =require('express');
const router =express.Router();
const UserFb =require('../controller/UserFacebookController.js');

router.route('/').get(UserFb.authenPassportWithFaceBookCallBack);

module.exports = router;
