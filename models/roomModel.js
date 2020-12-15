const mongoose =require('mongoose');

const RoomModel = new mongoose.Schema({
    id:String,
    idUser:[{ type: mongoose.Schema.Types.ObjectId, ref: 'localuser'}],
    roomCapacity:{type: Boolean, default:true }
});

const room = mongoose.model('room',RoomModel);

module.exports =room;
