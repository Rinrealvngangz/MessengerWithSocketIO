$(document).ready(function() {

  $("#btn-JoinRoom").click(() => {
    const idName = $('#inputId').val();
  })
  $('#CreateRoom').click(() => {
    const idRoom = Date.now() + '';
    const data = $('#createId').val(idRoom);
    alert(`success create room: ${idRoom}`);

  });
  $('#roomcreated').click(() => {
    const data = $('#roomcreated').val();
    if (data !== '') {
      $(':button[type="submit"]').prop('disabled', false);

      $('#idRoomCreated').val(data);
    }

  })
  $('#btn-ConnectRoom').click(() => {
    const data = $('#idRoomCreated').val();
    alert(`ConnectRoom success : ${data}`);


  })
});
