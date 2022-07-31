'use strict'

var listaReservas;

window.addEventListener('load', () =>{
     cargaJsonReservas();
     cargaJson();   
});



function ImprimirListaReservas(){
    let tbody = document.getElementById('tbdReservas');

 listaReservas = getReservasArray();

    tbody.innerHTML = '';

    for (let i = 0; i < listaReservas.length; i++) {
        
        let reserva = listaReservas[i];

        let fila = tbody.insertRow();
        let celdaNumReserva = fila.insertCell();
        let celdaMascota = fila.insertCell();
        let celdafechaEnt = fila.insertCell();
        let celdaFecha= fila.insertCell();
        let celdaEstado = fila.insertCell();
      

        celdaNumReserva.innerHTML = reserva.NumeroReservacion;
        celdaNumReserva.classList.add('infoTd');
        celdaMascota.innerHTML = reserva.NombreMascota;
        celdaMascota.classList.add('infoTd');
        celdafechaEnt.innerHTML = reserva.FechaHoraIngreso;
        celdafechaEnt.classList.add('infoTd');
        celdaFecha.innerHTML = reserva.FechaHoraSalida;
        celdaFecha.classList.add('infoTd');
        celdaEstado.innerHTML = reserva.Estado;
        celdaEstado.classList.add('Estado');
        celdaEstado.classList.add('infoTd');
        
    }
    let EstadoCita = document.querySelectorAll('.Estado');
        console.log(EstadoCita.length);
        VerEstadoReservas(EstadoCita);
}


 function VerEstadoReservas(EstadoCita){
    
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




