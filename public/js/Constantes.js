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


function shortDate(fecha) {
  // let fecha = new Date(pDate.toString());
  // return fecha.getDate()+"-"+fecha.getMonth()+"-"+fecha.getFullYear() + ' '+ fecha.getHours() + ':'+ fecha.getMinutes();
  return fecha;
}

function FilterStartDate(pFecha) {

  let fecha = new Date(pFecha);
        fecha.setHours(fecha.getHours()+0);
        fecha =  fecha.toISOString();
  return fecha; 
}

function FilterEndDate(pFecha) {

  let fecha = new Date(pFecha);
        fecha.setHours(fecha.getHours()+24);
        fecha =  fecha.toISOString();
  return fecha; 
}