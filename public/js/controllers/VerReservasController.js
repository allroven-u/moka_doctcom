'use strict'

var listaReservas;

window.addEventListener('load', () =>{
     cargaJsonReservas();
     cargaJson();   

     setTimeout(() => {ImprimirListaReservas();}, 1000);
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
        let celdaBoton = fila.insertCell();
      

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

        let EstadoCitaif = document.querySelectorAll('.Estado');
        if (EstadoCitaif[i].innerHTML == 'AGENDADA' ) {
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','#');
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid");
        iconoV.classList.add("fa-eye");
        iconoV.classList.add("btnV");
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV)     ;
        let Boton = document.createElement('a');
        Boton.setAttribute('href','#');
        let icono =document.createElement('i');
        icono.classList.add("fa-solid");
        icono.classList.add("fa-pen-to-square");
        icono.classList.add("btnEd");
        Boton.appendChild(icono);
        celdaBoton.appendChild(Boton);
        let BotonC = document.createElement('a');
        BotonC.setAttribute('onclick','ShowModalCancelReservaFunct()');
        let iconoC =document.createElement('i');
        iconoC.classList.add("fa-solid");
        iconoC.classList.add("fa-circle-xmark");
        iconoC.classList.add("btnCa");
        BotonC.appendChild(iconoC);
        celdaBoton.appendChild(BotonC);
        }else{
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','#');
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid");
        iconoV.classList.add("fa-eye");
        iconoV.classList.add("btnV");
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV);
        }
        
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

