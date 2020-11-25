const mongoose =require('mongoose');

const contentModel = new mongoose.Schema({
      idUser:{ type: mongoose.Schema.Types.ObjectId, ref: 'localuser'},
      content:{type: String ,default:null},
      dateSend:{type: Date, default: Date.now},
    });

const content =mongoose.model('content',contentModel);

module.exports =content;
