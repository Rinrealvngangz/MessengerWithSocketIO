const mongoose =require('mongoose');

const RoomModel = new mongoose.Schema({
    id:String,
    messid:[{ type: mongoose.Schema.Types.ObjectId, ref: 'content'}],
    room:{ type: Boolean, default:true}
},{_id:false});

const room = mongoose.model('room',RoomModel);

module.exports =room;
