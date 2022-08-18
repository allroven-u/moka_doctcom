'use strict';
let userSession;


window.addEventListener('load', () =>{
    userSession=GetSesion();
});

let btnRegistroMascota = document.getElementById("btnRegistroMascota");
let inputNombre = document.getElementById("txtNombre");
let inputDireccionRegistroM = document.getElementById("txtDireccionRegistroM");

btnRegistroMascota.addEventListener("click", Registrar);

function Registrar() {
    if (ValidarDatosRegMascota() == true) {
        ConfirmarDatos();
        let IDcliente = userSession.Identificacion;
        let sNombre = inputNombre.value;
        let sDireccion = inputDireccionRegistroM.value;
        let sLatitud ='';
        let sLongitud ='';
        let sFoto='';
        RegistrarMascota(IDcliente,sNombre,sDireccion,sLatitud,sLongitud,sFoto);
        limpiarFormRegMascota();
    }
}

function ValidarDatosRegMascota() {

    let sNombre = inputNombre.value;
    let sDireccion = inputDireccionRegistroM.value;



    if (sNombre == null || sNombre == undefined || sNombre == "") {
        inputNombre.classList.add("error")
        MostrarError();
        return false;

    } else {
        inputNombre.classList.remove("error")
    }
    if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
        inputDireccionRegistroM.classList.add("error")
        MostrarError();
        return false;
    } else {
        inputDireccionRegistroM.classList.remove("error")
    }
    return true;
}

function MostrarError() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Dato Requerido!',
    })
}

function ConfirmarDatos() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registrado!',
        showConfirmButton: false,
        timer: 1500
    })
}

function limpiarFormRegMascota() {
    document.getElementById('FormRegistroMascota').reset();
}