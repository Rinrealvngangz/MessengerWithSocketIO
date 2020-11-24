const express = require('express');
const Room =require('../models/roomModel.js');


exports.createRoom= async (req,res)=>{
    const idRoom =req.body.inputId;
    await Room.findOne({id:idRoom},(err,result)=>{
         if(!result){
               //Room.create
         }
    })
}
