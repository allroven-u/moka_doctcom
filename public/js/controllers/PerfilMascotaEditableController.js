'use strict';

let btnGuardarCambios = document.getElementById("btn-guardarMiPerfil2")
btnGuardarCambios.addEventListener('click', EnviarDatosCorreo)

let txtMascota = document.getElementById('TxtMascotaM');
let txtDireccionM = document.getElementById('txtDireccionM');
let statusM = document.getElementById('statusM');


let listaMascotas = [];
let userSessionM = GetSesion();

let btnBack = document.getElementById('btnBack');

///////////Obtener id url/////////////////
let queryString, urlParams, _id;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    await ImprimirDatosMascota(_id);
}

//location.href = './perfilMascota.html?_id='+listaMascotas[i]._id;


async function GetlistaMascota() {
    let result = await getMascotasArray(userSessionM.Identificacion);
    if (result != {} && result.resultado == true) {
        listaMascotas = result.MascotasDB;
    }
    return listaMascotas;
}
async function ImprimirDatosMascota(p_id) {
    let cargarMascotas = await GetlistaMascota();
    for (let i = 0; i < cargarMascotas.length; i++) {
        if (cargarMascotas[i]._id === p_id) {
            txtMascota.textContent = cargarMascotas[i].NombreMascota;
            txtDireccionM.value = cargarMascotas[i].Direccion;
            statusM.value = cargarMascotas[i].Activo;
        }
    }
   
}

btnBack.addEventListener('click', function(){
    location.href = './perfilMascota.html?_id='+_id;
})



async function EnviarDatosCorreo() {
    if (ValidarDatosMascota() == true) {
        let spDireccionM = txtDireccionM.value;
        let spStatusM = statusM.value;
        let result = await EditarDatosMascota(_id, spDireccionM, spStatusM);
        if (result != {} && result.resultado) {
            ConfirmarDatos(result.msj);
            setTimeout(function() {
                location.href = "./perfilMascota.html?_id="+_id;
            }, 2000);
        }else{
            MostrarError(result.msj);
        };
    }
}


function ValidarDatosMascota() {

    let sConttxtDireccionM = txtDireccionM.value;
    let sEstadoM = statusM.value;

    if (sConttxtDireccionM == null || sConttxtDireccionM == undefined || sConttxtDireccionM == "") {
        resaltarInputInvalido("txtDireccionM");
        MostrarErrorContactenos();
        return false;
    }
    
    if (sEstadoM == null || sEstadoM == undefined || sEstadoM == "") {
        resaltarInputInvalido("txtDireccionM");
        MostrarErrorContactenos();
        return false;
    }


    return true;
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
    }, 4000);
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
