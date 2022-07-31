'use strict'

let inputNombreC = document.getElementById('txtUsuario-c');
let inputContrasenha1C = document.getElementById('txtContrasenha-c');
let inputContrasenha2C = document.getElementById('txtContrasenha2-c');


// let btnCambiarC = document.getElementById('btnPassword');
// btnCambiarC.addEventListener('click',CrearReserva);

function CambiarContrasenha(){
   if(ValidarCambioContrsenha() == true) {
    ConfirmarDatosC();
   }
}

function ValidarCambioContrsenha(){
    let sNombre = inputNombre.value;
    let pwContrasenha = inputContrasenha1.value;
    let pwContrasenha2 = inputContrasenha2.value;

    if (sNombre == null || sNombre == undefined || sNombre == ""){
        inputNombre.classList.add("rError")
        MostrarErrorC();
        return false;

    }else{
        inputNombre.classList.remove("rError")
    }

    if (pwContrasenha == null || pwContrasenha == undefined || pwContrasenha == ""){
        inputContrasenha1.classList.add("rError")
        MostrarErrorC();
        return false;
    }else{
        inputContrasenha1.classList.remove("rError")
    }
    if (pwContrasenha2 == null || pwContrasenha2 == undefined || pwContrasenha2 == "" || pwContrasenha != pwContrasenha2){
        inputContrasenha2.classList.add("rError")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no son iguales!',
        })
        return false;
        
    }else{
        inputContrasenha2.classList.remove("rError")
    }
}
function MostrarErrorC(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Dato Requerido!',
    })
}
function ConfirmarDatosC(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
}
