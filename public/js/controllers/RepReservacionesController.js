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
 
     let celFecha = thRow.insertCell();
     celFecha.innerHTML = 'Fecha';
 
     let celEstado = thRow.insertCell();
     celEstado.innerHTML = 'Estado';
 
     let celAcciones = thRow.insertCell();
     celAcciones.innerHTML = 'Acciones';


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
    let EstadoCita = document.querySelectorAll('.Estado');
        console.log(EstadoCita.length);
        VerEstado(EstadoCita);
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




