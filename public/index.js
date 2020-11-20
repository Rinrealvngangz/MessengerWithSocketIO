$(document).ready(function(){
    var socket = io();
   $('#img-send').click((e)=>{
      e.preventDefault();
      const text =$('#input-text').val();
      socket.emit('client-server-message',text);
        $('.messages').append($(`<div class="right-message">`).text(text));
           $('#input-text').val('');
        return false;
    });
    socket.on('client-server-message',(msg)=>{
          $('.messages').append($(`<div class="left-message">`).text(msg));

    });

  });
