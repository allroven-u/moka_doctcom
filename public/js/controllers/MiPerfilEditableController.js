'use strict';

let btnGuardarCambios = document.getElementById("btn-guardarMiPerfil2")
btnGuardarCambios.addEventListener('click', EditarDatosUser)

let inputtxtNombreP = document.getElementById("txtNombreP");

let inputtxtApellidosP = document.getElementById("txtApellidosP");
let inputtxtCedulaP = document.getElementById("txtCedulaP");
let inputtxtEmailP = document.getElementById("txtEmailP");
// let inputtxtPasswordP=document.getElementById('txtPassword');
let inputFotoUser= document.getElementById('imgFotoUser')

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
            console.log("_id: "+userSession._id);
            inputtxtNombreP.value= listaUsuarios[i].Nombre;
            inputtxtApellidosP.value = listaUsuarios[i].Apellido;
            inputtxtCedulaP.value = listaUsuarios[i].Identificacion;
            inputtxtEmailP.value=listaUsuarios[i].Email;
            inputFotoUser.src= listaUsuarios[i].Foto;
            inputtxtDireccionP.value = listaUsuarios[i].Direccion;


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

function EditarDatosUser() {
    if (ValidarDatosUser()) {

        ActualizarDatos();
        ConfirmarDatosLogin();
        setTimeout(function() {
            window.location.pathname = "/public/MiPerfil.html";
        }, 2000);
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
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtApellidosP == null || sConttxtApellidosP == undefined || sConttxtApellidosP == "") {
        resaltarInputInvalido("txtApellidosP");
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtCedulaP == null || sConttxtCedulaP == undefined || sConttxtCedulaP == "") {
        resaltarInputInvalido("txtCedulaP");
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtEmailP == null || sConttxtEmailP == undefined || sConttxtEmailP == "") {
        resaltarInputInvalido("txtEmailP");
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtEmailP == null || sConttxtEmailP == undefined || sConttxtEmailP == "") {
        resaltarInputInvalido("txtEmailP");
        MostrarErrorContactenos("El email es requerido!");
        return false;
    }else if(!sConttxtEmailP.match(ValidarEmail)){
        resaltarInputInvalido("txtEmailP");
        MostrarErrorContactenos("Formato de email invalido!");
        return false;
    }

    if (sConttxtDireccionP == null || sConttxtDireccionP == undefined || sConttxtDireccionP == "") {
        resaltarInputInvalido("txtDireccionP");
        MostrarErrorContactenos();
        return false;
    }

    return true;
}


function ActualizarDatos(){
    let sID= userSession._id;
    let sConttxtNombreP = inputtxtNombreP.value;
    let sConttxtApellidosP = inputtxtApellidosP.value;
    let sConttxtCedulaP = inputtxtCedulaP.value;
    let sConttxtEmailP = inputtxtEmailP.value;
    let sConttxtDireccionP = inputtxtDireccionP.value;
    let sFoto = inputFotoUser.src;
    EditarUsuario(sID,sConttxtNombreP,sConttxtApellidosP,sConttxtCedulaP,sConttxtEmailP,sConttxtDireccionP,sFoto);
}

function CambiarContrasenha(){
    
}


function MostrarErrorContactenos() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Dato requerido!",
    });
}

function resaltarInputInvalido(pinputID) {
    var obj = document.getElementById(pinputID);
    var orig = obj.style;
    obj.style = 'border: 2px solid red; border-left: 10px solid var(--Rojo2);'

    setTimeout(function() {
        obj.style = orig;
    }, 5000);
}

function ConfirmarDatosLogin() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Datos actualizados!",
        showConfirmButton: false,
        timer: 1500,
    });
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