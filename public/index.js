$(document).ready(function() {

  $("#btn-JoinRoom").click(()=>{
       const idName =$('#inputId').val();

  })
  $('#CreateRoom').click(()=>{
     const idRoom = Date.now()+'';
    const data =  $('#createId').val(idRoom);
  alert(`success create room: ${idRoom}`);

  });

  $('#btn-ConnectRoom').click(()=>{
        const data = $('#rooms-created').val();
         alert(`success create room: ${data}`);
  })
  });
