const mongoose = require('mongoose');

const Users = new mongoose.Schema({
  name:{type :String, unique:true},
  password:{ type :String, maxlength:6}

});
module.exports =mongoose.model('User',Users);
