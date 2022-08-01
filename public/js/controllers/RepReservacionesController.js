'use strict'

var listaReservas;

window.addEventListener('load', () =>{
     cargaJsonReservas();
     cargaJson();
     setTimeout(() => {ImprimirListaReservas();}, 1000);    
});



function ImprimirListaReservas(){
    let tThead = document.getElementById('tTheadReservas');
    let tbody = document.getElementById('tBodyReservas');

    let listaReservas = getReservasArray();

    tbody.innerHTML = '';
    tThead.innerHTML = '';

     // thead
     let thRow = tThead.insertRow();

     let celNumCita = thRow.insertCell();
     celNumCita.innerHTML = 'Num. Reserva';
 
     let celPropietario = thRow.insertCell();
     celPropietario.innerHTML = 'Propietario';
 
     let celMascota = thRow.insertCell();
     celMascota.innerHTML = 'Mascota';
 
     let celFechaIngreso = thRow.insertCell();
     celFechaIngreso.innerHTML = 'Fecha Ingreso';

     let celFechaSalida = thRow.insertCell();
     celFechaSalida.innerHTML = 'Fecha Salida';
 
     let celEstado = thRow.insertCell();
     celEstado.innerHTML = 'Estado';


    for (let i = 0; i < listaReservas.length; i++) {
        
        let reserva = listaReservas[i];
        let propietario = buscaUsuarioID(reserva.IdentificacionUsurio) ;

        let fila = tbody.insertRow();

        let celdaNumReserva = fila.insertCell();
        celdaNumReserva.innerHTML = reserva.NumeroReservacion;

        let celdaPropietario = fila.insertCell();
        celdaPropietario.innerHTML = propietario.Nombre + ' ' + propietario.Apellido1;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = reserva.NombreMascota;

        let celdafechaEnt = fila.insertCell();
        celdafechaEnt.innerHTML = reserva.FechaHoraIngreso;

        let celdaFechaSalida= fila.insertCell();
        celdaFechaSalida.innerHTML = reserva.FechaHoraSalida;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = reserva.Estado;
        celdaEstado.classList.add('Estado');

        
    }
    let EstadoReservacion = document.querySelectorAll('.Estado');
        console.log(EstadoReservacion.length);
        VerEstadoReservas(EstadoReservacion);
}


 function VerEstadoReservas(EstadoReservacion){
    
     for (let i = 0; i < EstadoReservacion.length; i++) {
     let sEstadoCita = EstadoReservacion[i].innerHTML;    
     console.log(sEstadoCita)
     if (sEstadoCita == 'AGENDADA'){
        EstadoReservacion[i].classList.add("AGENDADA")
        
     }
     if (sEstadoCita == 'CANCELADA'){
        EstadoReservacion[i].classList.add("CANCELADA")
       
     }
     if (sEstadoCita == 'FINALIZADA'){
        EstadoReservacion[i].classList.add("FINALIZADA")
        
     }   
     }
 }




