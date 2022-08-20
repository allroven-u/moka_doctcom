'use strict'
let listaReservas = [];

window.addEventListener('load', () =>{

    GetListaReservas();
});

async function GetListaReservas() {

    let result = await getReservasArray();
    if( result != {} && result.resultado == true){
        listaReservas=result.ListaReservasBD;
        llenarCompletarReserva();

    }
}

///////////Obtener id url/////////////////
let queryString, urlParams, _id;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    console.log(_id);
}

let inputNumReservaDatos = document.getElementById('numReservaDatos');
let inputNombreReservaDatos = document.getElementById('txtNombreMascota');
let inputDescripReservaDatos = document.getElementById('txtDescripcion');
let inputObservReservaDatos = document.getElementById('txtObservaciones');

function llenarCompletarReserva(){
    for (let i = 0; i < listaReservas.length; i++) {
        if(listaReservas[i]._id == _id){
            
            inputNumReservaDatos.innerHTML= 'Reservación Número: '+listaReservas[i].NumeroReservacion;
            inputNombreReservaDatos.innerHTML=listaReservas[i].NombreMascota;
            inputDescripReservaDatos.innerHTML="Reserva numero:"+listaReservas[i].NumeroReservacion +"</br>Identificación dueño: "+listaReservas[i].
            IdentificacionUsuario+"</br>Mascota: "+listaReservas[i].NombreMascota+"</br>Fecha de ingreso: "+listaReservas[i].
            FechaHoraIngreso+"</br>Fecha de Salida: "+listaReservas[i].
            FechaHoraSalida
            "20220809";
            inputObservReservaDatos.innerHTML=listaReservas[i].
            ObservacionesReservacion;
        }
    }    
}