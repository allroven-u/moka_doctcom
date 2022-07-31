"use strict";


let citasArray = []; // arreglo de usuarios

// Esta funcion carga un archivo tipo json y lo carga a un array utilizando un promesa de js
function cargaJsonCitas() {

  fetch("/public/assets/data/infoCitas.json")
    .then((response) => response.json())
    .then((response) => {
        citasArray = response;
        console.log(citasArray);
    });
    
//   return citasArray;
};


function getCitasArray(){
return citasArray;
};

function FiltrarCitas(pFecha1,pFecha2,pVeterinarioID,pNombreMascota,pDuenio){

  for (let i = 0; i < citasArray.length; i++) {
    const cita = citasArray[i];
    
  }

  return citasArray;
  };

