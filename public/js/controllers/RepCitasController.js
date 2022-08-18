'use strict';

var listaCitas;

window.addEventListener('load', () =>{
     cargaJsonCitas();
     cargaJson();   
});


function ImprimirListaCitas(){

    let tThead = document.getElementById('tTheadCitas');
    let tbody = document.getElementById('tBodyCitas');

    listaCitas = getCitasArray();
   

    tbody.innerHTML = '';
    tThead.innerHTML = '';

      // thead
      let thRow = tThead.insertRow();

      let celNumCita = thRow.insertCell();
      celNumCita.innerHTML = 'Num. Cita';
  
      let celMascota = thRow.insertCell();
      celMascota.innerHTML = 'Mascota';
  
      let celVeterinario = thRow.insertCell();
      celVeterinario.innerHTML = 'Veterinario';
  
      let celFecha = thRow.insertCell();
      celFecha.innerHTML = 'Fecha';
  
      let celEstado = thRow.insertCell();
      celEstado.innerHTML = 'Estado';
  

    for (let i = 0; i < listaCitas.length; i++) {

        let  cita = listaCitas[i];
        let veterinario = buscaUsuarioID(cita.IdentificacionVeterinario);  

        let fila = tbody.insertRow();

        let celdaNumCita = fila.insertCell();
        celdaNumCita.innerHTML = cita.NumeroCita;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = cita.NombreMascota;

        let celdaVeterinario = fila.insertCell();
        celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;

        let celdaFecha= fila.insertCell();
        celdaFecha.innerHTML = cita.FechaHora;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = cita.Estado;
        celdaEstado.classList.add('Estado');
        
    }
     let EstadoCita = document.querySelectorAll('.Estado');
         console.log(EstadoCita.length);
         VerEstado(EstadoCita);
}


 function VerEstado(EstadoCita){
    
     for (let i = 0; i < EstadoCita.length; i++) {
     let sEstadoCita = EstadoCita[i].innerHTML;    
     console.log(sEstadoCita)
     if (sEstadoCita == 'AGENDADA'){
         EstadoCita[i].classList.add("AGENDADA")
        
     }
     if (sEstadoCita == 'CANCELADA'){
         EstadoCita[i].classList.add("CANCELADA")
       
     }
     if (sEstadoCita == 'FINALIZADA'){
         EstadoCita[i].classList.add("FINALIZADA")
        
     }   
     }
 }
