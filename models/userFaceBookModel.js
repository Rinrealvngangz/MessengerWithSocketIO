const mongoose =require('mongoose');

const UserFbSchema = new mongoose.Schema({
     id:Number,
     name:String,
     email:String,
     photo:String
});

const userfbSchema = mongoose.model('userFaceBook',UserFbSchema);

module.exports = userfbSchema;
