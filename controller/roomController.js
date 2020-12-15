const express = require('express');
const Room =require('../models/roomModel.js');
const User =require('../models/userModel.js');

exports.createRoom= async (req,res)=>{
    const username = req.user.name;
    const idRoom =req.body.createId;
    let filter = {name:username};
    let arrIdRoom =[];
    let capa =true;
    await User.findOne(filter,async (err,result)=>{
            if(result){

              if(req.body.Room === 'privateRoom'){capa=false;}

             const roomObj ={
               id:idRoom,
               roomCapacity:capa,
               idUser:[]
             }
             roomObj.idUser.unshift(result);
             console.log(roomObj);
             await Room.create(roomObj,async(err,results)=>{
                       if(results){
                  result.idRoom.push(results);
                  await result.save();
                  }
                  if(err){
                    console.log(err);
                  }
             });
          res.render('main',{idRoom:roomObj.id,
                             photo:req.user.photo,
                              name:req.user.name
                             });
            }else{
              console.log('no exists userName');
            }

    });
}
