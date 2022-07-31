"use strict";


let reservaArray = []; // arreglo de usuarios

// Esta funcion carga un archivo tipo json y lo carga a un array utilizando un promesa de js
function cargaJsonReservas() {

  fetch("/public/assets/data/infoReservaciones.json")
    .then((response) => response.json())
    .then((response) => {
        reservaArray = response;
        console.log(reservaArray);
    });
    
//   return reservaArray;
};


function getReservasArray(){
return reservaArray;
};

function FiltrarCitas(pFecha1,pFecha2,pVeterinarioID,pNombreMascota,pDuenio){

  for (let i = 0; i < reservaArray.length; i++) {
    const cita = reservaArray[i];
    
  }

  return reservaArray;
  };



