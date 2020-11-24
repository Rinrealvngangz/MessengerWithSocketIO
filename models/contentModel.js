const mongoose =require('mongoose');

const contentModel = new mongoose.Schema({
      idByUser:{type:String},
      content:{type:String},
      dateSend:{type:Date,default:Date.now},
    },{_id:false});

const content =mongoose.model('content',contentModel);
exports.module =content;    
