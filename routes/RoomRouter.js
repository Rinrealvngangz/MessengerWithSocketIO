const express =require('express');
const RoomController =require('../controller/roomController.js');

const router = express.Router();
router.route('/').get(RoomController.getRoom).post(RoomController.createRoom);

module.exports =router;
