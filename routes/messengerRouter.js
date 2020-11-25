const express =require('express');
const UserLocal =require('../controller/UserLocalController.js');
const RoomController =require('../controller/roomController.js');
const router = express.Router();

router.route('/').get(UserLocal.checkAuthenticated,UserLocal.viewMessenger).post(RoomController.createRoom);
//router.route('/createRoom').post(RoomController.createRoom);

module.exports =router;
