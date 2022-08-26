"use strict";

let listaUsuarios = [];
let userSessionRC;


let botonFiltrar = document.getElementById("btnFiltroCita");
let fechaInicio = document.getElementById("DateFecha1");
let fechaFinal = document.getElementById("DateFecha2");

window.addEventListener("load", () => {
    userSessionRC = GetSesion();
    GetlistaVeterinarios();
  });

  botonFiltrar.addEventListener("click", () => {
    FiltarListaCitas(fechaInicio.value, fechaFinal.value);
  });

  async function GetlistaVeterinarios() {
    let result;

    if (userSessionRC.Rol == 1) {
        result = await buscaUsuarioByRol(3);
    }
  
    if (result != {} && result.resultado == true) {
        ImprimirVeterinarios(result.ListaUsuariosBD);
    }
  }

 function ImprimirVeterinarios(ListaVeterinarios) {
    ////////////////////creacion tabla Veterinarios///////////////////////
    let tThead = document.getElementById("tTheadCalificaciones");
    let tbody = document.getElementById("tBodyCalificaciones");
  
    tbody.innerHTML = "";
    tThead.innerHTML = "";
  
    /////////////// thead ////////////////////////
    let thRow = tThead.insertRow();
  
    let celVeterinario = thRow.insertCell();
    celVeterinario.innerHTML = "Veterinario";
    
    let celCalificacionProm = thRow.insertCell();
    celCalificacionProm.innerHTML = "Calificación Promedio";
  
  
    for (let i = 0; i < ListaVeterinarios.length; i++) {
      let vet = ListaVeterinarios[i];
  
      let fila = tbody.insertRow();
  
      let celdaVeterinario = fila.insertCell();
      celdaVeterinario.innerHTML = vet.Nombre;
 
       let celdaCalificacionProm = fila.insertCell();
       celdaCalificacionProm.innerHTML = vet.CalificacionPromedio;
  
    }

  
  }