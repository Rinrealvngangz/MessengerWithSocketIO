const mongoose =require('mongoose');

const contentModel = new mongoose.Schema({
      idByUser:{type:String},
      content:{type:String},
      dateSend:{type:Date,default:Date.now},
    },{_id:false});

const roomModel = new mongoose.Schema({
    id:String,
  //  messById:[content],
    typeRoom:{type:Boolean,default:true},

},{_id:false});

const room = mongoose.model('room',roomModel);

exports.module =room;
