"use strict";
let btnIniciar = document.getElementById("btnIniciar");
let inputUsuarioLogin = document.getElementById("txtUsuario-l");
let inputContrasenha1Login = document.getElementById("txtContrasenha-l");

btnIniciar.addEventListener("click", IniciarSesion);

async function IniciarSesion() {
    if (ValidarDatosLogin()) {
        let Email = inputUsuarioLogin.value;
        Email = Email.trim();
        let result = await validarLogin(Email, inputContrasenha1Login.value);
         if (result) {
            ConfirmarDatosLogin();
             location.href = './AppVerCitas.html'
         } else {
           ErrorDatosLogin();
         }
    }
}

async function ValidarDatosLogin() {
    let sUsuario = inputUsuarioLogin.value;
    let pwContrasenha = inputContrasenha1Login.value;
    if (sUsuario == null || sUsuario == undefined || sUsuario == "") {
        inputUsuarioLogin.classList.add("lError");
        MostrarErrorLogin();
        return false;
    } else {
        inputUsuarioLogin.classList.remove("lError");
    }
    if (
        pwContrasenha == null ||
        pwContrasenha == undefined ||
        pwContrasenha == ""
    ) {
        inputContrasenha1Login.classList.add("lError");
        MostrarErrorLogin();
        return false;
    } else {
        inputContrasenha1Login.classList.remove("lError");
    }
    return true;
}

function MostrarErrorLogin() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Dato requerido!",
    });
}

async function ConfirmarDatosLogin() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Sesión iniciada!",
        showConfirmButton: false,
        timer: 1500,
    });
}

async function ErrorDatosLogin() {
    Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Usuario o contraseña incorrectos!",
        showConfirmButton: false,
        timer: 1500,
    });
}