const express = require('express');
const Room = require('../models/roomModel.js');
const User = require('../models/userModel.js');
exports.checkIdRoom = async (req, res) => {
  const idChecked = req.body.inputId;
  const userName = req.user.name;
  await Room.findOne({
    id: idChecked
  }, async (err, result) => {
    if (result) {

      await User.findOne({
        name: userName
      }, async (err, results) => {
        if (results) {
          const checkExistUser = result.idUser.indexOf(results._id);
          const checkCapacity = result.roomCapacity;
          if (checkCapacity === false && result.idUser.length === 2 && checkExistUser === -1) {

            res.redirect('/messenger');

          } else {
            console.log(checkExistUser);
            if (checkExistUser === -1) {
              result.idUser.push(results);
              await result.save();
            }
            const checkExistRoomJoin = results.joinRoom.indexOf(result._id);
            if (checkExistRoomJoin === -1) {
              results.joinRoom.push(result);
              await results.save();
            }
            res.render('chat', {
              idRoom: result.id,
              photo: req.user.photo,
              name: req.user.name,
              items: []
            });
          }
          if (err) {
            console.log(err);
          }
        }

      });

    } else {
      res.redirect('/messenger');
    }
    if (err) {
      console.log(err);
    }


  })

}
