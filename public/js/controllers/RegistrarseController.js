'use strict'


let btnRegistrar = document.getElementById("btnRegistrar");
let inputNombre = document.getElementById("txtNombre");
let inputApellido = document.getElementById("txtApellido");
let inputCedula = document.getElementById("numCedula");
let inputEmail = document.getElementById("txtEmail");
let inputUsuario = document.getElementById("txtUsuario");
let inputContrasenha1 = document.getElementById("txtContrasenha");
let inputContrasenha2 = document.getElementById("txtContrasenha2");
let inputDireccion = document.getElementById("txtDireccion");

btnRegistrar.addEventListener("click", Registrar);

function Registrar() {
    if (ValidarDatos() == true) {
        ConfirmarDatos();
    }
}

function ValidarDatos() {
    let sNombre = inputNombre.value;
    let sApellido = inputApellido.value;
    let sCedula = inputCedula.value;
    let sEmail = inputEmail.value;
    let sUsuario = inputUsuario.value;
    let pwContrasenha = inputContrasenha1.value;
    let pwContrasenha2 = inputContrasenha2.value;
    let sDireccion = inputDireccion.value;



    if (sNombre == null || sNombre == undefined || sNombre == "") {
        inputNombre.classList.add("rError")
        MostrarError();
        return false;

    } else {
        inputNombre.classList.remove("rError")
    }
    if (sApellido == null || sApellido == undefined || sApellido == "") {
        inputApellido.classList.add("rError")
        MostrarError();
        return false;
    } else {
        inputApellido.classList.remove("rError")
    }
    if (sCedula == null || sCedula == undefined || sCedula == "") {
        inputCedula.classList.add("rError")
        MostrarError();
        return false;
    } else {
        inputCedula.classList.remove("rError")
    }
    if (sEmail == null || sEmail == undefined || sEmail == "") {
        inputEmail.classList.add("rError")
        MostrarError();
        return false;
    } else {
        inputEmail.classList.remove("rError")
    }
    if (sUsuario == null || sUsuario == undefined || sUsuario == "") {
        inputUsuario.classList.add("rError")
        MostrarError();
        return false;
    } else {
        inputUsuario.classList.remove("rError")
    }
    if (pwContrasenha == null || pwContrasenha == undefined || pwContrasenha == "") {
        inputContrasenha1.classList.add("rError")
        MostrarError();
        return false;
    } else {
        inputContrasenha1.classList.remove("rError")
    }
    if (pwContrasenha2 == null || pwContrasenha2 == undefined || pwContrasenha2 == "" || pwContrasenha != pwContrasenha2) {
        inputContrasenha2.classList.add("rError")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no son iguales!',
        })
        return false;

    } else {
        inputContrasenha2.classList.remove("rError")
    }
    if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
        inputDireccion.classList.add("rError")
        MostrarError();
        return false;
    } else {
        inputDireccion.classList.remove("rError")
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