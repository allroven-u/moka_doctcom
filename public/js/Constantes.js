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

function resaltarInputInvalido(pinputID) {
  var obj = document.getElementById(pinputID);
  var orig = obj.style;
  obj.style = "border: 2px solid red; border-left: 10px solid var(--Rojo2);";

  setTimeout(function () {
    obj.style = orig;
  }, 5000);
}



function estadoMascota(pEstado) {
  switch (Number(pEstado)) {
    case 1:
      return "Normal"
    case 2:
      return "Perdido"
    case 3:
      return "Muerto"
  }
}

