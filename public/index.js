$(document).ready(function() {

  $("#btn-JoinRoom").click(()=>{
       const idName =$('#inputId').val();

  })
  $('#CreateRoom').click(()=>{
     const idRoom = Date.now()+'';
    const data =  $('#createId').val(idRoom);
  alert(`success room: ${idRoom}`);

  });
  });
