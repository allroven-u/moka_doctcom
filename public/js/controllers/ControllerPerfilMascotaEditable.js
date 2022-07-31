let btnGuardarCambios = document.getElementById("btn-guardarMiPerfil2")
btnGuardarCambios.addEventListener('click', EnviarDatosCorreo)

let inputtxtDuennoM = document.getElementById("txtDuennoM");
let inputtxtEdadM = document.getElementById("txtEdadM");
let inputtxtDireccionM = document.getElementById("txtDireccionM");
let inputtxtObservacionesM = document.getElementById("txtObservacionesM");

function EnviarDatosCorreo(){
  if (ValidarDatosContactenos() == true){
    ConfirmarDatosLogin();
    setTimeout(function () {
        window.location.pathname = "/public/perfilMascota.html";
    }, 2000);
  }
}

function ValidarDatosContactenos() {
  let sConttxtDuennoM = inputtxtDuennoM.value;
  let sConttxtEdadM = inputtxtEdadM.value;
  let sConttxtDireccionM = inputtxtDireccionM.value;
  let sConttxtObservacionesM = inputtxtObservacionesM.value;

  if (sConttxtDuennoM == null || sConttxtDuennoM == undefined || sConttxtDuennoM == "") {
    resaltarInputInvalido("txtDuennoM");
    MostrarErrorContactenos();
    return false;
  }

  if (sConttxtEdadM == null || sConttxtEdadM == undefined || sConttxtEdadM == "") {
    resaltarInputInvalido("txtEdadM");
    MostrarErrorContactenos();
    return false;
  }

  if (sConttxtDireccionM == null || sConttxtDireccionM == undefined || sConttxtDireccionM == "") {
    resaltarInputInvalido("txtDireccionM");
    MostrarErrorContactenos();
    return false;
  }

  if (sConttxtObservacionesM == null || sConttxtObservacionesM == undefined || sConttxtObservacionesM == "") {
    resaltarInputInvalido("txtObservacionesM");
    MostrarErrorContactenos();
    return false;
  }

  return true;
}

function MostrarErrorContactenos() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Dato Requerido!",
  });
}

function resaltarInputInvalido(pinputID) {
  var obj = document.getElementById(pinputID);
  var orig = obj.style;
  obj.style = 'border: 2px solid red; border-left: 10px solid var(--Rojo2);'

  setTimeout(function () {
      obj.style = orig;
  }, 5000);
}

function ConfirmarDatosLogin() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Datos Actualizados!",
    showConfirmButton: false,
    timer: 1500,
});
}