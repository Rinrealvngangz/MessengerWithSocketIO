const express =require('express');
const RoomController =require('../controller/roomController.js');
const UserLocal =require('../controller/UserLocalController.js');

const router = express.Router();
router.route('/').get(UserLocal.checkAuthenticated,RoomController.viewChat).post(RoomController.getRoom);

module.exports =router;
