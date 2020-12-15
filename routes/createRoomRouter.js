const express =require('express');
const RoomController =require('../controller/roomController.js');

const router = express.Router();
router.route('/').post(RoomController.createRoom);

module.exports =router;
