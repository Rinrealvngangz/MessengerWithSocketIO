$(document).ready(function(){
    var socket = io();
   $('#img-send').click((e)=>{
      e.preventDefault();
      socket.emit('client-server-message',$('#input-text').val());
        $('#input-text').val('');
        return false;
    });
    socket.on('client-server-message',(msg)=>{
          $('#list-content').append($('<li>').text(msg));
    });

  });
