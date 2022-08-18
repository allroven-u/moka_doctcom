'use strict';

var listaCeterinario;

window.addEventListener('load', () =>{
     cargaJson();   
});


// function ImprimirListaCitas(){

//     listaCeterinario = getCitasArray();
//     let tbody = document.getElementById('tbdCitas');

//     tbody.innerHTML = '';

//     for (let i = 0; i < listaCitas.length; i++) {

//       let  cita = listaCitas[i];
//       let veterinario = buscaUsuarioID(cita.IdentificacionVeterinario);

//         let fila = tbody.insertRow();
//         let celdaNumCita = fila.insertCell();
//         let celdaMascota = fila.insertCell();
//         let celdaVeterinario = fila.insertCell();
//         let celdaFecha= fila.insertCell();
//         let celdaEstado = fila.insertCell();
//         let celdaBoton = fila.insertCell();

//          celdaNumCita.innerHTML = cita.NumeroCita;
//          celdaNumCita.classList.add('infoTd');
//          celdaMascota.innerHTML = cita.NombreMascota;
//          celdaMascota.classList.add('infoTd');
//          celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;
//          celdaVeterinario.classList.add('infoTd');
//          celdaFecha.innerHTML = cita.FechaHora;
//          celdaFecha.classList.add('infoTd');
//          celdaEstado.innerHTML = cita.Estado;
//          celdaEstado.classList.add('Estado');
//          celdaEstado.classList.add('infoTd');
        
//     }
//      let EstadoCita = document.querySelectorAll('.Estado');
//          console.log(EstadoCita.length);
//          VerEstado(EstadoCita);
// }


//  function VerEstado(EstadoCita){
    
//      for (let i = 0; i < EstadoCita.length; i++) {
//      let sEstadoCita = EstadoCita[i].innerHTML;    
//      console.log(sEstadoCita)
//      if (sEstadoCita == 'AGENDADA'){
//          EstadoCita[i].classList.add("AGENDADA")
        
//      }
//      if (sEstadoCita == 'CANCELADA'){
//          EstadoCita[i].classList.add("CANCELADA")
       
//      }
//      if (sEstadoCita == 'FINALIZADA'){
//          EstadoCita[i].classList.add("FINALIZADA")
        
//      }   
//      }
//  }
