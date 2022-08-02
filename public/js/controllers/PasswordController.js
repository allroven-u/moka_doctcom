'use strict'

let inputNombreC = document.getElementById('txtUsuario-c');
let inputContrasenha1C = document.getElementById('txtContrasenha-c');
let inputContrasenha2C = document.getElementById('txtContrasenha2-c');


let btnCambiarC = document.getElementById('btnPassword');
btnCambiarC.addEventListener('click',CambiarContrasenha);

function CambiarContrasenha(){
   if(ValidarCambioContrasenha() == true) {
    ConfirmarDatosCx();
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
        MostrarErrorCx();
        return false;

    }else{
        inputNombreC.classList.remove("rError")
    }

    if (pwContrasenha == null || pwContrasenha == undefined || pwContrasenha == ""){
        inputContrasenha1C.classList.add("rError")
        MostrarErrorCx();
        return false;
    }else{
        inputContrasenha1C.classList.remove("rError")
    }
    if (pwContrasenha2 == null || pwContrasenha2 == undefined || pwContrasenha2 == "" || pwContrasenha != pwContrasenha2){
        inputContrasenha2C.classList.add("rError")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no son iguales!',
        })
        return false;
        
    }else{
        inputContrasenha2C.classList.remove("rError")
    }
    return true;
}
function MostrarErrorCx(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Dato Requerido!',
    })
}
function ConfirmarDatosCx(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cambio de Contraseña exitoso!',
        showConfirmButton: false,
        timer: 1500
      })
}
function limpiarForm(idForm){
    document.getElementById(idForm).reset();
}
