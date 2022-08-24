'use strict';

let btnGuardarCambios = document.getElementById("btn-guardarMiPerfil2")
btnGuardarCambios.addEventListener('click', EditarDatosUser)

let inputtxtNombreP = document.getElementById("txtNombreP");

let inputtxtApellidosP = document.getElementById("txtApellidosP");
let inputtxtCedulaP = document.getElementById("txtCedulaP");
let inputtxtEmailP = document.getElementById("txtEmailP");
let inputFotoUser= document.getElementById('imgFotoUser');
let selectRolUser= document.getElementById('SelectRol');
let selectEstadoUser= document.getElementById('SelectEstado');

let inputtxtDireccionP = document.getElementById("txtDireccionP");
const ValidarEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
let userSession;
let listaUsuarios;
window.addEventListener('load', async() =>{
    userSession=GetSesion();
    await GetlistaUsuarios();
    CargarDatosUser(userSession)
});

async function GetlistaUsuarios(){
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
       listaUsuarios = result.ListaUsuariosBD;
    }
  }

  let selectRol = document.getElementById('selectRol');
  let selectEstado = document.getElementById('selectEstado');

  

function CargarDatosUser(userSession){
    for (let i = 0; i < listaUsuarios.length; i++) {
        
        if (listaUsuarios[i].Identificacion == userSession.Identificacion){
            inputtxtNombreP.value= listaUsuarios[i].Nombre;
            inputtxtApellidosP.value = listaUsuarios[i].Apellido;
            inputtxtCedulaP.value = listaUsuarios[i].Identificacion;
            inputtxtEmailP.value=listaUsuarios[i].Email;
            inputFotoUser.src= listaUsuarios[i].Foto;
            inputtxtDireccionP.value = listaUsuarios[i].Direccion;
            selectRolUser.value = listaUsuarios[i].Rol;
            selectEstadoUser.value = listaUsuarios[i].Activo;


            if (userSession.Rol == 1) {
                selectRol.classList.remove('hidden');
                selectEstado.classList.remove('hidden');
            }else{
                selectRol.classList.add('hidden');
                selectEstado.classList.add('hidden');
            }
        }
        
    }
}

async function EditarDatosUser() {
    if (ValidarDatosUser()) {
        let sID= userSession._id;
        let sConttxtNombreP = inputtxtNombreP.value;
        let sConttxtApellidosP = inputtxtApellidosP.value;
        let sConttxtCedulaP = inputtxtCedulaP.value;
        let sConttxtEmailP = inputtxtEmailP.value;
        let sConttxtDireccionP = inputtxtDireccionP.value;
        let sFoto = inputFotoUser.src;
        let sRol = Number(selectRolUser.value);
        let sEstado = Number(selectEstadoUser.value);
        let result = await EditarUsuario(sID,sConttxtNombreP,sConttxtApellidosP,sConttxtCedulaP,sConttxtEmailP,sConttxtDireccionP,sFoto,sRol,sEstado);
        if (result != {} && result.resultado) {
            ConfirmarDatos(result.msj);
            setTimeout(function() {
                window.location.pathname = "/public/MiPerfil.html";
            }, 2000);
        }else{
            MostrarError(result.msj);
        }

    }
}

function ValidarDatosUser() {
    let sConttxtNombreP = inputtxtNombreP.value;
    let sConttxtApellidosP = inputtxtApellidosP.value;
    let sConttxtCedulaP = inputtxtCedulaP.value;
    let sConttxtEmailP = inputtxtEmailP.value;
    let sConttxtDireccionP = inputtxtDireccionP.value;

    if (sConttxtNombreP == null || sConttxtNombreP == undefined || sConttxtNombreP == "") {
        resaltarInputInvalido("txtNombreP");
        MostrarError("El nombre es requerido!");
        return false;
    }

    if (sConttxtApellidosP == null || sConttxtApellidosP == undefined || sConttxtApellidosP == "") {
        resaltarInputInvalido("txtApellidosP");
        MostrarError("El Apellido es requerido!");
        return false;
    }

    if (sConttxtCedulaP == null || sConttxtCedulaP == undefined || sConttxtCedulaP == "") {
        resaltarInputInvalido("txtCedulaP");
        MostrarError("La cedula es requerida!");
        return false;
    }

    if (sConttxtEmailP == null || sConttxtEmailP == undefined || sConttxtEmailP == "") {
        resaltarInputInvalido("txtEmailP");
        MostrarError("El email es requerido!");
        return false;
    }else if(!sConttxtEmailP.match(ValidarEmail)){
        resaltarInputInvalido("txtEmailP");
        MostrarError("Formato de email invalido!");
        return false;
    }

    if (sConttxtDireccionP == null || sConttxtDireccionP == undefined || sConttxtDireccionP == "") {
        resaltarInputInvalido("txtDireccionP");
        MostrarError();
        return false;
    }

    return true;
}



////////////////////// cambiar Contrasenha MODAL //////////////////////////

function disableScroll() {
    window.scrollTo(0, 0);
}

const passwordModal = document.querySelector('.cModal-form');
const openModalPassword = document.querySelector(".redirect-modal-Password");
const closeModalPassword = document.getElementById('cancelPassword');
const overlayPE = document.querySelector('.overlay');
const cerrarButton = document.querySelector('.cerrarModalInicio');

const limpiarFormRecovery = function () {
    passwordModal.reset();
}

const hiddenModalPassword = function() {
    passwordModal.classList.add('hidden');
    overlayPE.classList.add('hidden');
    window.removeEventListener('scroll', disableScroll);
    limpiarFormRecovery();
};

// start function show modal
function ShowModalPasswordFunct() {
    passwordModal.classList.remove('hidden');
    overlayPE.classList.remove('hidden');
    location.href = "#top-page";
    window.addEventListener('scroll', disableScroll);
}
closeModalPassword.addEventListener('click', function() {
    hiddenModalPassword();
});
cerrarButton.addEventListener('click', function() {
    hiddenModalPassword();
});
overlayPE.addEventListener("click", hiddenModalPassword);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !passwordModal.classList.contains("hidden")) {
        hiddenModalPassword();
    }
});
openModalPassword.addEventListener('click', function() {
    ShowModalPasswordFunct();
});