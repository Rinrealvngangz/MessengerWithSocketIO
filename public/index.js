$(document).ready(function() {
  var socket = io();
  const name = $('h2').text();
  $('#img-send').click((e) => {
    e.preventDefault();

    const text = $('#input-text').val();
    socket.emit('client-server-message', { nd:text,name:name});
    $('.messages').append(`<div class="right-message">${text}<br><small>${name}</small></div>`);
    $('#input-text').val('');
    return false;
  });
  socket.on('client-server-message', (msg) => {
    $('.messages').append(`<div class="left-message">${msg.nd}<br><small>${msg.name}</small></div>`);
    //  $('.messages').append($(`<div class="left-message">`).text(msg));

  });

});
