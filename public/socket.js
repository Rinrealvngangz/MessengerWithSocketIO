$(document).ready(function() {
  var socket = io();
  const name =$.trim($('h2.name-display').html()) ;
  const textIdRoom =$('#textIdRoom').html();
  const idRoom = textIdRoom.slice(7);
  $('#btn-chat').click(()=>{
     alert(idRoom);
     socket.emit('create-room',{id:idRoom,mess:`${name} started to chat.`});
       $('#btn-chat').css('display','none');

  })
  socket.on('client-Join-Room',(data)=>{
     alert(data);
  })
  $('#btn-signOut').click(()=>{
    window.location.replace("http://localhost:3000/login");
  })


   $('#img-send').click((e) => {
      e.preventDefault();
      const text = $('#input-text').val();
      const dateSend = new Date();
      console.log(dateSend);
      socket.emit('client-server-message', { nd:text,name:name,date:dateSend,id:idRoom});
      $('.messages').append(`<div class="right-message">${text}<br><small>${name}</small></div>`);
      $('#input-text').val('');
      return false;
    });
    socket.on('server-message-client', (msg) => {
      $('.messages').append(`<div class="left-message">${msg.nd}<br><small>${msg.name}</small></div>`);
});

})
