let btnGuardarCambios = document.getElementById("btn-guardarMiPerfil2")
btnGuardarCambios.addEventListener('click', EnviarDatosCorreo)

let inputtxtNombreP = document.getElementById("txtNombreP");
let inputtxtApellidosP = document.getElementById("txtApellidosP");
let inputtxtCedulaP = document.getElementById("txtCedulaP");
let inputtxtEmailP = document.getElementById("txtEmailP");
let inputtxtUsuarioP = document.getElementById("txtUsuarioP");
let inputtxtDireccionP = document.getElementById("txtDireccionP");

function EnviarDatosCorreo() {
    if (ValidarDatosEditarPerfil() == true) {
        ConfirmarDatosLogin();
        setTimeout(function() {
            window.location.pathname = "/public/MiPerfil.html";
        }, 2000);
    }
}

function ValidarDatosEditarPerfil() {
    let sConttxtNombreP = inputtxtNombreP.value;
    let sConttxtApellidosP = inputtxtApellidosP.value;
    let sConttxtCedulaP = inputtxtCedulaP.value;
    let sConttxtEmailP = inputtxtEmailP.value;
    let sConttxtUsuarioP = inputtxtUsuarioP.value;
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

    if (sConttxtUsuarioP == null || sConttxtUsuarioP == undefined || sConttxtUsuarioP == "") {
        resaltarInputInvalido("txtUsuarioP");
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtDireccionP == null || sConttxtDireccionP == undefined || sConttxtDireccionP == "") {
        resaltarInputInvalido("txtDireccionP");
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

    setTimeout(function() {
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

function disableScroll() {
    window.scrollTo(0, 0);
}


////////////////////// cambiar Contrasenha MODAL //////////////////////////
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


/// RESETEAR CONTRASENHA VALIDACION

let inputActualContra = document.getElementById('txtContrasenha-antigua-c');
let inputContrasenha1C = document.getElementById('txtContrasenha-c');
let inputContrasenha2C = document.getElementById('txtContrasenha2-c');


let btnCambiarC = document.getElementById('btnPassword');
btnCambiarC.addEventListener('click',CambiarContrasenha);

function CambiarContrasenha(){
   if(ValidarCambioContrasenha() == true) {
    ConfirmarDatos('Cambio de Contraseña exitoso!');
    hiddenModalPassword();
   }
}

function ValidarCambioContrasenha(){
    let sActualContra = inputActualContra.value;
    let pwContrasenha = inputContrasenha1C.value;
    let pwContrasenha2 = inputContrasenha2C.value;

    if (sActualContra == null || sActualContra == undefined || sActualContra == ""){
        inputActualContra.classList.add("rError");
        MostrarError("La actual contraseña es requerida!");
        return false;

    }else{
        inputActualContra.classList.remove("rError");
    }

    if (pwContrasenha == null || pwContrasenha == undefined || pwContrasenha == ""){
        inputContrasenha1C.classList.add("rError")
        MostrarError("La contraseña es requerida!");
        return false;
    }else if(pwContrasenha.length>=6 && pwContrasenha.length<=15){
        inputContrasenha1C.classList.remove("rError")
    }else{
        inputContrasenha1C.classList.add("rError")
        MostrarError("La contraseña debe contener entre 6 y 15 caracteres!");
        return false;
    }
    if (pwContrasenha2 == null || pwContrasenha2 == undefined || pwContrasenha2 == "" || pwContrasenha != pwContrasenha2){
        inputContrasenha2C.classList.add("rError")
        MostrarError("Las contraseñas no son iguales!");
        return false;
        
    }else{
        inputContrasenha2C.classList.remove("rError")
    }
    return true;
}
function MostrarError(txtError){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: txtError,
    })
}
function ConfirmarDatos(txtConfirmar){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: txtConfirmar,
        showConfirmButton: false,
        timer: 1500
      })
}