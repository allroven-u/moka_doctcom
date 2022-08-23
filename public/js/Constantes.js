const apiUrl = 'http://localhost:3000/api';



////////////////Validaciones//////////////////////////

function MostrarError(txtInfo) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: txtInfo,
    });
  }
  
  function ConfirmarDatos(txtInfo) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: txtInfo,
      showConfirmButton: false,
      timer: 1500,
    });
  }