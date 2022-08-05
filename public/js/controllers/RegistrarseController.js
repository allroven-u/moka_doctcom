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
    const ValidarTexto = /^[a-zA-Z,.' -]+$/;
    const ValidarEmail = /^[a-zA-Z0-9]+\@*[a-zA-Z0-9]*\@{1}[a-zA-Z]+.com$/;

    if (sNombre == null || sNombre == undefined || sNombre == "") {
        inputNombre.classList.add("rError")
        MostrarError("El nombre es requerido!");
        return false;

    }else if(sNombre.match(ValidarTexto)){
        inputNombre.classList.remove("rError")
        
    } else {
        inputNombre.classList.add("rError")
        MostrarError("El nombre no puede contener caracteres especiales o numeros!");
        return false;
    }
    if (sApellido == null || sApellido == undefined || sApellido == "") {
        inputApellido.classList.add("rError")
        MostrarError("Formato de nombre no valido!");
        return false;
    } else if(sApellido.match(ValidarTexto)) {
        inputApellido.classList.remove("rError")
    }else{
        inputApellido.classList.add("rError")
        MostrarError("Formato de apellido no valido!");
        return false;
    }
    if (sCedula == null || sCedula == undefined || sCedula == "") {
        inputCedula.classList.add("rError")
        MostrarError("La cedula es requerida!");
        return false;
    } else {
        inputCedula.classList.remove("rError")
    }
    if (sEmail == null || sEmail == undefined || sEmail == "") {
        inputEmail.classList.add("rError")
        MostrarError("El correo requerido!");
        return false;
    } else if(sEmail.match(ValidarEmail)) {
        inputEmail.classList.remove("rError")
    }else{
        inputEmail.classList.add("rError")
        MostrarError("Formato de email no valido!");
        return false;
    }
    if (sUsuario == null || sUsuario == undefined || sUsuario == "") {
        inputUsuario.classList.add("rError")
        MostrarError("El nombre de usuario es requerido!");
        return false;
    } else {
        inputUsuario.classList.remove("rError")
    }
    if (pwContrasenha == null || pwContrasenha == undefined || pwContrasenha == "") {
        inputContrasenha1.classList.add("rError")
        MostrarError("La contraseña es requerida!");
        return false;
    } else if(pwContrasenha.length>=6 && pwContrasenha.length<=15) {
        inputContrasenha1.classList.remove("rError")
    }else{
        inputContrasenha1.classList.add("rError")
        MostrarError("La contraseña debe contener entre 6 y 15 caracteres!");
        return false;
    }
    if (pwContrasenha2 == null || pwContrasenha2 == undefined || pwContrasenha2 == "" || pwContrasenha != pwContrasenha2) {
        inputContrasenha2.classList.add("rError")
        MostrarError('Las contraseñas no son iguales!');
        return false;

    } else {
        inputContrasenha2.classList.remove("rError")
    }
    if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
        inputDireccion.classList.add("rError")
        MostrarError('La dirección es requerida!');
        return false;
    } else {
        inputDireccion.classList.remove("rError")
    }
    return true;
}

function MostrarError(txtError) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: txtError,
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