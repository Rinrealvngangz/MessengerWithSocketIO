const express =require('express');
const router =express.Router();
const CheckRoom =require('../controller/checkRoom.js');

router.route('/').post(CheckRoom.checkIdRoom);

module.exports = router;
