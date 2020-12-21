const mongoose =require('mongoose');

const RoomModel = new mongoose.Schema({
    id:String,
    idUser:[{ type: mongoose.Schema.Types.ObjectId, ref: 'localuser'}],
    roomCapacity:{type: Boolean, default:true },
    message:[{
        name:String,
        content:String,
        dateSend:{type:Date,default:Date.now}
    }]
});

const room = mongoose.model('room',RoomModel);

module.exports =room;
