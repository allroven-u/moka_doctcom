'use strict'

let inputNombreC = document.getElementById('txtUsuario-c');
let inputContrasenha1C = document.getElementById('txtContrasenha-c');
let inputContrasenha2C = document.getElementById('txtContrasenha2-c');


let btnCambiarC = document.getElementById('btnPassword');
btnCambiarC.addEventListener('click',CambiarContrasenha);

function CambiarContrasenha(){
   if(ValidarCambioContrasenha() == true) {
    ConfirmarDatos('Cambio de Contraseña exitoso!');
    limpiarForm('formCambioC');
    hiddenModalPassword();
   }
}

function ValidarCambioContrasenha(){
    let sNombre = inputNombreC.value;
    let pwContrasenha = inputContrasenha1C.value;
    let pwContrasenha2 = inputContrasenha2C.value;

    if (sNombre == null || sNombre == undefined || sNombre == ""){
        inputNombreC.classList.add("rError")
        MostrarError("El usuario es requerido!");
        return false;

    }else{
        inputNombreC.classList.remove("rError")
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
function limpiarForm(idForm){
    document.getElementById(idForm).reset();
}
