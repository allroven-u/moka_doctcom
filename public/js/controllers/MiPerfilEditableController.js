let btnGuardarCambios = document.getElementById("btn-guardarMiPerfil2")
btnGuardarCambios.addEventListener('click', EnviarDatosCorreo)

let inputtxtNombreP = document.getElementById("txtNombreP");
let inputtxtApellidosP = document.getElementById("txtApellidosP");
let inputtxtCedulaP = document.getElementById("txtCedulaP");
let inputtxtEmailP = document.getElementById("txtEmailP");
let inputtxtUsuarioP = document.getElementById("txtUsuarioP");
let inputtxtDireccionP = document.getElementById("txtDireccionP");

function EnviarDatosCorreo() {
    if (ValidarDatosContactenos() == true) {
        ConfirmarDatosLogin();
        setTimeout(function() {
            window.location.pathname = "/public/MiPerfil.html";
        }, 2000);
    }
}

function ValidarDatosContactenos() {
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

////////////////////// cambiar Contrasenha //////////////////////////
const passwordModal = document.querySelector('.cModal-form');
const redirectModalPassword = document.querySelector(".redirect-modal-Password");
const closeModalPassword = document.getElementById('cancelPassword');


const hiddenModalPassword = function() {
    passwordModal.classList.add('hidden');
    overlay.classList.add('hidden');
    window.removeEventListener('scroll', disableScroll);
};

// start function show modal
function ShowModalPasswordFunct() {
    passwordModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    location.href = "#top-page";
    window.addEventListener('scroll', disableScroll);
}
closeModalPassword.addEventListener('click', function() {
    hiddenModalPassword();
});
redirectModalPassword.addEventListener('click', function() {
    ShowModalPasswordFunct();
});