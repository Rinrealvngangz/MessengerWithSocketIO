$(document).ready(function() {
  var socket = io();
  const name = $('h2').text();
  $('#btn-chat').click(()=>{
  const textIdRoom =$('#textIdRoom').html();
  const idRoom = textIdRoom.slice(7);
     alert(idRoom);
     socket.emit('create-room',idRoom);
       $('#btn-chat').css('display','none');
  })
  $('#btn-signOut').click(()=>{
    window.location.replace("http://localhost:3000/login");    
  })


   $('#img-send').click((e) => {
      e.preventDefault();
      const text = $('#input-text').val();

      socket.emit('client-server-message', { nd:text,name:name});
      $('.messages').append(`<div class="right-message">${text}<br><small>${name}</small></div>`);
      $('#input-text').val('');
      return false;
    });
    socket.on('server-message-client', (msg) => {
      $('.messages').append(`<div class="left-message">${msg.nd}<br><small>${msg.name}</small></div>`);
});

})
