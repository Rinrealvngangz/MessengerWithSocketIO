$(document).ready(function() {
  var socket = io();
  const name = $.trim($('h2.name-display').html());
  const textIdRoom = $('#textIdRoom').html();
  const idRoom = textIdRoom.slice(7);
  $('#btn-chat').click(() => {
    alert(idRoom);
    socket.emit('create-room', {
      id: idRoom,
      mess: `${name} started to chat.`
    });
    $('#btn-chat').css('display', 'none');

  })
  socket.on('client-Join-Room', (data) => {
    alert(data);
  })
  $('#btn-signOut').click(() => {
    window.location.replace("http://localhost:3000/login");
  })

  $('#img-send').click((e) => {
    e.preventDefault();
    const text = $('#input-text').val();
    const dateSend = new Date();
    //  const time = dateSend.toLocaleTimeString().toLowerCase();
    socket.emit('client-server-message', {
      nd: text,
      name: name,
      date: dateSend,
      id: idRoom
    });
    $('#input-text').val('');
    return false;
  });

  $('.messages').click((event) => {
    if (event.target.nodeName === 'IMG') {
      const idMess = $(event.target).parent().attr('id');
      socket.emit('client-send-delete', {
        idContent: idMess,
        idRoom: idRoom
      });
    }
    const target = $(event.target);
    target.children('img').toggle();
  });

  socket.on('server-send-myData', (data) => {
    const htmlContent = `<div class="right-message" id='${data.idMess}'>${data.nd}<br><small>${data.name}</small>
<img src='/image/icons8-trash-20.png' id='img-right-delete' onclick="deleteMessage(this)" width='20px' height='20px' alt="delete-content"></div>`
    $('.messages').append(htmlContent);

  });
  socket.on('server-send-idDeleteMessage', (idMessage) => {
    $('.messages').find('div#' + idMessage).remove();
  })
  socket.on('server-message-client', (msg) => {
    $('.messages').append(`<div class="left-message" id='${msg.idMess}' >${msg.nd}<br><small>${msg.name}</small></div>`);
  });

})

function deleteMessage(e) {
  e.parentNode.remove();
}
