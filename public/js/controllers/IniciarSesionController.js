"use strict";
let btnIniciar = document.getElementById("btnIniciar");
let inputUsuarioLogin = document.getElementById("txtUsuario-l");
let inputContrasenha1Login = document.getElementById("txtContrasenha-l");
let listaUsuarios;
btnIniciar.addEventListener("click", IniciarSesion);

window.addEventListener("load", () => {
    GetlistaUsuarios();
  });

async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
      listaUsuarios = result.ListaUsuariosBD;
      console.log(listaUsuarios)
    }
  }

async function IniciarSesion() {
    if (await ValidarDatosLogin()) {
        let Email = inputUsuarioLogin.value;
        Email = Email.trim();
        let result = await validarLogin(Email, inputContrasenha1Login.value);
        if (result) {
            for (let i = 0; i < listaUsuarios.length; i++){
                if(Email == listaUsuarios[i].Email){
                    if (listaUsuarios[i].Activo !=1){
                        MostrarError("¡Usuario inactivo, contacte al administrador!");
                    }else{
                        ConfirmarDatos("¡Sesión iniciada!");
                        location.href = './AppVerCitas.html'
                    }
                }
            }
        }else {
            MostrarError("¡Usuario o contraseña incorrectos!");
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
    if (pwContrasenha == null || pwContrasenha == undefined || pwContrasenha == "") {
        inputContrasenha1Login.classList.add("lError");
        MostrarError("Contraseña requerida");
        return false;
    } else {
        inputContrasenha1Login.classList.remove("lError");
    }
    return true;
}

                    