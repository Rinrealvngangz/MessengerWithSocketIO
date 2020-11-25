const mongoose = require('mongoose');

const Users = new mongoose.Schema({
  email:String,
  name:{type :String, unique:true},
  password:{ type :String, minlength:8},
  idRoom:[{id:String, capa:{type:Boolean,default:true}}]
});
const User =mongoose.model('localuser',Users);
module.exports =User;
