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
        ConfirmarDatos("¡Sesión iniciada!");
            location.href = './AppVerCitas.html'
        } else {
            if (ValidarDatosLogin==true) {
                MostrarError("¡Usuario o contraseña incorrectos!");
            } 
        }
    }
}

async function ValidarDatosLogin() {
    let sUsuario = inputUsuarioLogin.value;
    let pwContrasenha = inputContrasenha1Login.value;
    if (sUsuario == null || sUsuario == undefined || sUsuario == "") {
        inputUsuarioLogin.classList.add("lError");
        MostrarError("Correo requerido!");
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
        MostrarError("Contraseña requerida");
        return false;
    } else {
        inputContrasenha1Login.classList.remove("lError");
    }
    return true;
}
