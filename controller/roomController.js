const express = require('express');
const Room =require('../models/roomModel.js');
const User =require('../models/userModel.js');


exports.getRoom =async (req,res)=>{

     const idRoom =req.body.idRoomCreated;
     await Room.findOne({id:idRoom},(err,result)=>{
             if(result){
                console.log(result.message);
                res.render('chat',{idRoom:result.id,
                                   photo:req.user.photo,
                                   name:req.user.name,
                                   items:result.message
                                  });
             }
             if(err){
               console.log(err);
             }
     })
}

exports.createRoom= async (req,res)=>{
    const username = req.user.name;
     const idRoom =req.body.createId;
     console.log(idRoom);
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

          res.render('chat',{idRoom:roomObj.id,
                             photo:req.user.photo,
                             name:req.user.name,
                             items:[]
                            });
                            //res.redirect('/chat');
            }else{
              res.redirect('/login');
              console.log('no exists userName');
            }

    });
}

exports.viewChat =(req,res)=>{

     res.render('chat',{photo:req.user.photo,
                       name:req.user.name});

}
