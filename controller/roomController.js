const express = require('express');
const Room =require('../models/roomModel.js');
const User =require('../models/userModel.js');

exports.createRoom= async (req,res)=>{
    const username = req.user.name;
    let filter = {name:username};
    let arrIdRoom =[];
    await User.findOne( filter,async (err,result)=>{
            if(result){
              const idRoom =Date.now() + username;
                let objRoom={
                  id:idRoom,
                  capa:true
                };

              if(req.body.Room === 'privateRoom'){
                  objRoom ={
                     id:idRoom,
                     capa:false
                 };
              }
             arrIdRoom = result.idRoom;
             arrIdRoom.unshift(objRoom);
           await User.updateOne(filter,{idRoom:arrIdRoom});
            await result.save();
              res.redirect('/messenger');

            }else{
              console.log('no exists userName');
            }

    });
}
