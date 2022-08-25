'use strict';

let btnGuardarCambios = document.getElementById("btn-guardarMiPerfil2")
btnGuardarCambios.addEventListener('click', EditarDatosUser)
let btnCancelarCambios =document.querySelector('.btn-cancelar');
let btnCancelarCambiosAdmin =document.querySelector('.btn-cancelar-admin');
let inputtxtNombreP = document.getElementById("txtNombreP");

let inputtxtApellidosP = document.getElementById("txtApellidosP");
let inputtxtCedulaP = document.getElementById("txtCedulaP");
let inputtxtEmailP = document.getElementById("txtEmailP");
let inputtxtPhoneP = document.getElementById("txtPhoneP");
let inputFotoUser= document.getElementById('imgFotoUser');
let selectRolUser= document.getElementById('SelectRol');
let selectEstadoUser= document.getElementById('SelectEstado');

let inputtxtDireccionP = document.getElementById("txtDireccionP");
const ValidarEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
let userSession;
let listaUsuarios;




///////////Obtener id url/////////////////
let queryString, urlParams, _id, usuarioRol;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);
    console.log(urlParams)

    _id = urlParams.get('_id');
    usuarioRol = urlParams.get('rol');
}


window.addEventListener('load', async() =>{
    userSession=GetSesion();
    await GetlistaUsuarios();
    if (userSession.Rol == 1 && _id!= null) {
        CargarDatosAdmin(listaUsuarios)
        btnCancelarCambiosAdmin.classList.remove('hidden')
        btnCancelarCambios.classList.add('hidden')

      }else{
        CargarDatosUser(userSession)
        
      }
    
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
            inputtxtPhoneP.value=listaUsuarios[i].Telefono;
            inputFotoUser.src= listaUsuarios[i].Foto;
            inputtxtDireccionP.value = listaUsuarios[i].Direccion;
            selectRolUser.value = listaUsuarios[i].Rol;
            selectEstadoUser.value = listaUsuarios[i].Activo;
        }
        
    }
}

function CargarDatosAdmin(listaUsuarios) {

    for (let i = 0; i < listaUsuarios.length; i++) {
  
      if (listaUsuarios[i]._id == _id) {
        inputtxtNombreP.value= listaUsuarios[i].Nombre;
        inputtxtApellidosP.value = listaUsuarios[i].Apellido;
        inputtxtCedulaP.value = listaUsuarios[i].Identificacion;
        inputtxtEmailP.value=listaUsuarios[i].Email;
        inputtxtPhoneP.value=listaUsuarios[i].Telefono;
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
        let sID;
        if (userSession.Rol == 1 && _id!= null) {
            sID= _id;
        }else{
            sID=userSession._id;
        }
        let sConttxtNombreP = inputtxtNombreP.value;
        let sConttxtApellidosP = inputtxtApellidosP.value;
        let sConttxtCedulaP = inputtxtCedulaP.value;
        let sConttxtEmailP = inputtxtEmailP.value;
        let sConttxtPhoneP = inputtxtPhoneP.value;
        let sConttxtDireccionP = inputtxtDireccionP.value;
        let sFoto = inputFotoUser.src;
        let sRol = Number(selectRolUser.value);
        let sEstado = Number(selectEstadoUser.value);
        let result = await EditarUsuario(sID,sConttxtNombreP,sConttxtApellidosP,sConttxtCedulaP,sConttxtEmailP,sConttxtPhoneP,sConttxtDireccionP,sFoto,sRol,sEstado);
        if (result != {} && result.resultado) {
            
             ConfirmarDatos(result.msj);
            setTimeout(function() {
                if (userSession.Rol == 1 && _id!= null) {
                    window.location.pathname = "/public/reporteUsuario.html";
                }else{
                    window.location.pathname = "/public/MiPerfil.html";
                }
                
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
    let sConttxtPhoneP = inputtxtPhoneP.value;
    let sConttxtDireccionP = inputtxtDireccionP.value;
    const ValidarEmail =/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    let isnum = /^\d+$/.test(sConttxtCedulaP);
    let isphone = /^\d+$/.test(sConttxtPhoneP);

    if (sConttxtNombreP == null || sConttxtNombreP == undefined || sConttxtNombreP == "") {
        resaltarInputInvalido("txtNombreP");
        MostrarError("¡El nombre es requerido!");
        return false;
    }

    if (sConttxtApellidosP == null || sConttxtApellidosP == undefined || sConttxtApellidosP == "") {
        resaltarInputInvalido("txtApellidosP");
        MostrarError("¡El apellido(s) es requerido!");
        return false;
    }

    if (sConttxtCedulaP == null || sConttxtCedulaP == undefined || sConttxtCedulaP == "") {
        resaltarInputInvalido("txtCedulaP");
        MostrarError("¡La identificación es requerida!");
        return false;
    }
    if (isnum == false) {
        resaltarInputInvalido("txtCedulaP");
        MostrarError("¡La identificación debe contener solo números! No puede contener caracteres especiales como guiones.");
        return false;
    }

    if (sConttxtCedulaP.length < 9 || sConttxtCedulaP.length > 12) {
        resaltarInputInvalido("txtCedulaP");
        MostrarError("¡La cedula persona física debe tener 9 números, cedula persona jurídica 10 números, NITE 10 números y la DIMEX 11 o 12 números! Todas sin cero al inicio ni guiones.");
        return false;
    }

    if (sConttxtEmailP == null || sConttxtEmailP == undefined || sConttxtEmailP == "") {
        resaltarInputInvalido("txtEmailP");
        MostrarError("¡El correo electrónico es requerido!");
        return false;
    }else if(!sConttxtEmailP.match(ValidarEmail)){
        resaltarInputInvalido("txtEmailP");
        MostrarError("¡Formato de correo electrónico invalido!");
        return false;
    }

    if (sConttxtPhoneP == null || sConttxtPhoneP == undefined || sConttxtPhoneP == "") {
        inputtxtPhoneP.classList.add("rError")
        MostrarError("¡El número de télefono es requerido!");
        return false;
    }
    if (isphone == false) {
        inputtxtPhoneP.classList.add("rError")
        MostrarError("¡El teléfono debe contener solo números! No puede contener caracteres especiales como guiones.");
        return false;
    }

    if (sConttxtPhoneP.length !== 8) {
        inputtxtPhoneP.classList.add("rError")
        MostrarError("¡El teléfono no debe contener mas, ni menos de 8 números.");
        return false;
    }
    else {
        inputtxtPhoneP.classList.remove("rError")
    }

    if (sConttxtDireccionP == null || sConttxtDireccionP == undefined || sConttxtDireccionP == "") {
        resaltarInputInvalido("txtDireccionP");
        MostrarError("¡La dirección es requerida!");
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