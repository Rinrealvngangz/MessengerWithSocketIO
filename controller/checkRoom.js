const express = require('express');
const Room =require('../models/roomModel.js');
const User =require('../models/userModel.js');
exports.checkIdRoom=async(req,res)=>{
    const idChecked = req.body.inputId;
    const userName = req.user.name;
     await Room.findOne({id:idChecked},async(err,result)=>{
          if(result){
                await User.findOne({name:userName},async(err,results)=>{
                      if(results){
                         result.idUser.push(results);
                         await result.save();
                         results.joinRoom.push(result);
                         await results.save();

                      }
                      if(err){
                        console.log(err);
                      }
                });
                res.render('chat',{idRoom:result.id,
                                   photo:req.user.photo,
                                    name:req.user.name
                                  });
          }else{
              res.redirect('/messenger');
          }
          if(err){
            console.log(err);
          }


     })

}
