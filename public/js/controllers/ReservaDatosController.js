'use strict'
let listaReservas = [];



const btnEnviar = document.getElementById('enviar');
const btnFactura = document.getElementById('factura');

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
let queryString, urlParams, _id, usuarioRol, opcionVer, estadoR;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    usuarioRol = urlParams.get('rol');
    opcionVer = urlParams.get('opcion');
    estadoR = urlParams.get("estado");
}

usuarioRol = Number(usuarioRol);

const btnDescrip = document.getElementById("boxBtn");
const boxDiagnosticos = document.querySelector(".box-2");
const boxCancelacion = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
const btnsVDE = document.querySelector(".btnsE");
const btnsVDF = document.querySelector(".btnsF");

const boxDescripcion = document.getElementById("boxDescripcion");
const txtDescripcion = document.getElementById("txtDescricionO");
const boxExterna = document.querySelector(".box-externa");
const tableInfoCita = document.querySelector(".box-all");
const boxCalificacion = document.querySelector('.califContainer');
const titleCalf = document.getElementById('titleCalf');

if (usuarioRol !== 3 && opcionVer === 'ver') {
    box4.classList.remove("hidden");
    boxDiagnosticos.classList.remove("hidden");
    boxDescripcion.classList.remove("hidden");
    txtDescripcion.setAttribute("readonly", true);
    tableInfoCita.classList.remove("hidden");
    tableInfoCita.style = "margin-top: 0px";
    boxCalificacion.classList.add('hidden');
    //boxDiagnosticos.classList.add('hidden');
}else if(usuarioRol !== 2 && opcionVer === 'compl'){
    btnDescrip.classList.remove("hidden");
    box4.classList.remove("hidden");
    boxDiagnosticos.classList.remove("hidden");
    boxExterna.classList.remove("hidden");
    tableInfoCita.classList.remove("hidden");
    boxDescripcion.classList.remove("hidden");
    btnsVDE.classList.remove('hidden');
}else if(opcionVer === 'final' &&  estadoR === 'CANCELADA'){
    boxCalificacion.classList.add('hidden');
    boxCancelacion.classList.remove("hidden");
 }else if(usuarioRol !== 3 && opcionVer === 'final' && estadoR === "FINALIZADA"){
   titleCalf.textContent = "Calificación Veterinario";
   btnsVDF.classList.remove('hidden');
   box4.classList.remove("hidden");
   boxDiagnosticos.classList.remove("hidden");
   boxDescripcion.classList.remove("hidden");
   txtDescripcion.setAttribute("readonly", true);
   tableInfoCita.classList.remove("hidden");
   tableInfoCita.style = "margin-top: 0px";
   boxCalificacion.classList.add('hidden')
 }else if(usuarioRol === 3 && opcionVer === 'final'){
   boxCalificacion.classList.add('hidden');
   box4.classList.remove("hidden");
   boxDiagnosticos.classList.remove("hidden");
   boxDescripcion.classList.remove("hidden");
   txtDescripcion.setAttribute("readonly", true);
   tableInfoCita.classList.remove("hidden");
   tableInfoCita.style = "margin-top: 0px";
   boxCalificacion.classList.add('hidden');
 }

let inputNumReservaDatos = document.getElementById('numReservaDatos');
let inputNombreReservaDatos = document.getElementById('txtNombreMascota');
let OutnumReserva = document.getElementById('numReserva');
let OutfechaCitaIn = document.getElementById('fechaCitaIn');
let OutfechaCitaOut = document.getElementById('fechaCitaOut');
let Outobservaciones = document.getElementById('observaciones');
let OutestadoReserva = document.getElementById('estadoReserva');
let OutMotivoCancelar = document.getElementById('txtMotivoCancelar');
const estrellas = document.querySelectorAll('.fa-star');

//agrega estrellas
  var cantidadS = 0;
  for(let i = 0; i < estrellas.length; i++){
    estrellas[i].addEventListener('click', function(){
      cantidadS = i + 1;
      for(let p = 0; p  < cantidadS; p++){
        estrellas[p].classList.add('star');
      }
      console.log(cantidadS);
      return cantidadS;
    })
  }

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
                boxCancelacion.classList.remove('hidden');
            }
        }
    }    
}

//envia estrellas mascota

btnEnviar.addEventListener('click', async function(){
    for (let i = 0; i < listaReservas.length; i++) {
      if (listaReservas[i]._id === _id) {
        let pNumR = listaReservas[i].NumeroReservacion;
        if (ValidarDatosReserva() === true) {
          let result = await  UpdateReservaCalificacion(pNumR, cantidadS) 
          if (result != {} && result.resultado) {
              ConfirmarDatos(result.msj);
          }else{
              MostrarError(result.msj);
          };
      }
      }
    }
  })
  function ValidarDatosReserva(){
    if(cantidadS === null || cantidadS === undefined || cantidadS === ' ' || cantidadS === 0){
      MostrarError('Debe ingresar la calificacion de la mascota');
      return false;
    }
    return true;
  }
  