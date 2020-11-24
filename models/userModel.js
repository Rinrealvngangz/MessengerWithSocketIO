const mongoose = require('mongoose');

const Users = new mongoose.Schema({
  email:String,
  name:{type :String, unique:true},
  password:{ type :String, minlength:8},
  idRoom:{type:String,default:null}
});
const User =mongoose.model('localuser',Users);
module.exports =User;
