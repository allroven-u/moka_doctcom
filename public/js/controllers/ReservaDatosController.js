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
let queryString, urlParams, _id, usuarioRol, opcionVer;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    usuarioRol = urlParams.get('rol');
    opcionVer = urlParams.get('opcion');
}

usuarioRol = Number(usuarioRol);

const btnDescrip = document.getElementById('boxBtn');
const boxDiagnosticos = document.querySelector('.box-2');
const boxCancelacion = document.querySelector('.box-3');
const box4 = document.querySelector('.box-4');
const btnsVD = document.querySelector('.btns');
const buttonVerCita = document.getElementById('Pagar');

const boxDescripcion = document.getElementById('boxDescripcion');
const txtDescripcion = document.getElementById('txtDescricionO');
const boxExterna = document.querySelector('.box-externa');
const tableInfoCita = document.querySelector('.box-all');

if (usuarioRol !== 3 && opcionVer === 'ver') {
    box4.classList.remove('hidden');
    boxDiagnosticos.classList.remove('hidden');
    boxDescripcion.classList.remove('hidden');
    txtDescripcion.setAttribute('readonly', true);
    tableInfoCita.classList.remove('hidden');
    tableInfoCita.style = 'margin-top: 0px';
    //boxDiagnosticos.classList.add('hidden');
}else if(usuarioRol !== 2 && opcionVer === 'compl'){
    btnDescrip.classList.remove('hidden');
    buttonVerCita.classList.toggle('btn-doctor');
    buttonVerCita.value = 'Enviar';
    box4.classList.remove('hidden');
    boxDiagnosticos.classList.remove('hidden');
    boxExterna.classList.remove('hidden')
    tableInfoCita.classList.remove('hidden');
    boxDescripcion.classList.remove('hidden');
}

let inputNumReservaDatos = document.getElementById('numReservaDatos');
let inputNombreReservaDatos = document.getElementById('txtNombreMascota');
let OutnumReserva = document.getElementById('numReserva');
let OutfechaCitaIn = document.getElementById('fechaCitaIn');
let OutfechaCitaOut = document.getElementById('fechaCitaOut');
let Outobservaciones = document.getElementById('observaciones');
let OutestadoReserva = document.getElementById('estadoReserva');
let OutMotivoCancelar = document.getElementById('txtMotivoCancelar');

function llenarCompletarReserva(){
    for (let i = 0; i < listaReservas.length; i++) {
        if(listaReservas[i]._id == _id){
            
            inputNumReservaDatos.innerHTML= 'Número reservación: '+listaReservas[i].NumeroReservacion;
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
            OutMotivoCancelar.innerHTML = listaReservas[i].NotasCancelacion;

            if(listaReservas[i].Estado === 'CANCELADA'){
                boxDiagnosticos.classList.add('hidden');
                btnsVD.style = "display: none;";
                boxCancelacion.classList.remove('hidden');
            }
        }
    }    
}