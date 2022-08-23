'use strict';
let userSession;


window.addEventListener('load', () =>{
    userSession=GetSesion();
});

let btnRegistroMascota = document.getElementById("btnRegistroMascota");
let inputNombre = document.getElementById("txtNombre");
let inputDireccionRegistroM = document.getElementById("txtDireccionRegistroM");
let inputFoto = document.getElementById('imgFotoMascota');

btnRegistroMascota.addEventListener("click", Registrar);

async function Registrar() {
    if (ValidarDatosRegMascota() == true) {
        let IDcliente = userSession.Identificacion;
        let sNombre = inputNombre.value;
        let sDireccion = inputDireccionRegistroM.value;
        let sLatitud ='';
        let sLongitud ='';
        let sFoto=inputFoto.src;
        console.log(sFoto)
         let result = await RegistrarMascota(IDcliente,sNombre,sDireccion,sLatitud,sLongitud,sFoto);
         if (result != {} && result.data.resultado) {
            ConfirmarDatos(result.data.msj);
            limpiarFormRegMascota();
            hiddenRegistroM();
            location.href = './Mascotas.html';
        }else{
            MostrarError(result.data.msj);
        }
        
    }
}

function ValidarDatosRegMascota() {

    let sNombre = inputNombre.value;
    let sDireccion = inputDireccionRegistroM.value;



    if (sNombre == null || sNombre == undefined || sNombre == "") {
        inputNombre.classList.add("error")
        MostrarError("El nombre es requerido!");
        return false;

    } else {
        inputNombre.classList.remove("error")
    }
    if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
        inputDireccionRegistroM.classList.add("error")
        MostrarError("La dirección es requerida!");
        return false;
    } else {
        inputDireccionRegistroM.classList.remove("error")
    }
    return true;
}


function limpiarFormRegMascota() {
    document.getElementById('FormRegistroMascota').reset();
}