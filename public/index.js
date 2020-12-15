$(document).ready(function() {
  var socket = io();
  const name = $('h2').text();

  $("#btn-JoinRoom").click(()=>{
       const idName =$('#inputId').val();
       socket.emit('create-room',idName);
  })
  $('#CreateRoom').click(()=>{
      const idRoom = Date.now();
    const data =  $('#createId').val(idRoom);
         socket.emit('create-room',idRoom);
         alert(`success room: ${idRoom}`);

  });

  $('#img-send').click((e) => {
    e.preventDefault();
    const text = $('#input-text').val();
    const textIdRoom =$('#textIdRoom').html();
    const idRoom = textIdRoom.slice(7);
    socket.emit('client-server-message', { nd:text,name:name,id:idRoom});
    $('.messages').append(`<div class="right-message">${text}<br><small>${name}</small></div>`);
    $('#input-text').val('');
    return false;
  });
  socket.on('server-message-client', (msg) => {
    $('.messages').append(`<div class="left-message">${msg.nd}<br><small>${msg.name}</small></div>`);
    //  $('.messages').append($(`<div class="left-message">`).text(msg));

  });

});
