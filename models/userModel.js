const mongoose = require('mongoose');

const Users = new mongoose.Schema({
  email:String,
  name:{type :String, unique:true},
  password:{ type :String, maxlength:8}

});
const User =mongoose.model('localuser',Users);
module.exports =User;
