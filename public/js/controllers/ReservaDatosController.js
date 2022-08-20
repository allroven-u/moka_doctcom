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
let OutnumReserva = document.getElementById('numReserva');
let OutfechaCitaIn = document.getElementById('fechaCitaIn');
let OutfechaCitaOut = document.getElementById('fechaCitaOut');
let Outobservaciones = document.getElementById('observaciones');
let OutestadoReserva = document.getElementById('estadoReserva');

function llenarCompletarReserva(){
    for (let i = 0; i < listaReservas.length; i++) {
        if(listaReservas[i]._id == _id){
            
            inputNumReservaDatos.innerHTML= 'Reservación Número: '+listaReservas[i].NumeroReservacion;
            inputNombreReservaDatos.innerHTML=listaReservas[i].NombreMascota;

            OutnumReserva.innerHTML=listaReservas[i].NumeroReservacion;
            OutfechaCitaIn.innerHTML=listaReservas[i].
            FechaHoraIngreso;
            OutfechaCitaOut.innerHTML=listaReservas[i].
            FechaHoraSalida;
            Outobservaciones.innerHTML=listaReservas[i].
            ObservacionesReservacion;
            OutestadoReserva.innerHTML=listaReservas[i].
            Estado;
        }
    }    
}