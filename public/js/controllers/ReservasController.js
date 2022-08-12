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

    let celFechaIn = thRow.insertCell();
    celFechaIn.innerHTML = 'Fecha de Entrada';
    
    let celFechaOut = thRow.insertCell();
    celFechaOut.innerHTML = 'Fecha de Salida';

    let celEstado = thRow.insertCell();
    celEstado.innerHTML = 'Estado';

    let celAcciones = thRow.insertCell();
    celAcciones.innerHTML = 'Acciones';
    

    for (let i = 0; i < listaReservas.length; i++) {

        
        let  reserva = listaReservas[i];
        let propietario = buscaUsuarioID(reserva.IdentificacionUsurio) ;

        let fila = tbody.insertRow();

        let celdaNumReserva = fila.insertCell();
        celdaNumReserva.innerHTML = reserva.NumeroReservacion;

        let celdaPropietario = fila.insertCell();
        celdaPropietario.innerHTML = propietario.Nombre + ' ' + propietario.Apellido1 + ' ' + propietario.Apellido2;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = reserva.NombreMascota;

        let celdafechaEnt = fila.insertCell();
        celdafechaEnt.innerHTML = reserva.FechaHoraIngreso;

        let celdaFechaSalida= fila.insertCell();
        celdaFechaSalida.innerHTML = reserva.FechaHoraSalida;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = reserva.Estado;
        celdaEstado.classList.add('Estado');

        let celdaBoton = fila.insertCell();
        
        let EstadoCitaif = document.querySelectorAll('.Estado');
        
        if (EstadoCitaif[i].innerHTML == 'AGENDADA' ) {
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','/public/VerReservacionDatos.html')
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid")
        iconoV.classList.add("fa-eye")
        iconoV.classList.add("btnV")
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV);
        

        let Boton = document.createElement('a');
        Boton.setAttribute('href','/public/CompletarReservacion.html')
        let icono =document.createElement('i');
        icono.classList.add("fa-solid")
        icono.classList.add("fa-pen-to-square")
        icono.classList.add("btnEd")
        Boton.appendChild(icono);
        celdaBoton.appendChild(Boton);

        let BotonC = document.createElement('a');
        BotonC.setAttribute('onclick','ShowModalCancelReservaFunct()');
        let iconoC =document.createElement('i');
        iconoC.classList.add("fa-solid")
        iconoC.classList.add("fa-circle-xmark")
        iconoC.classList.add("btnCa")
        BotonC.appendChild(iconoC);
        celdaBoton.appendChild(BotonC);
        }else{
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','#')
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid")
        iconoV.classList.add("fa-eye")
        iconoV.classList.add("btnV")
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV);
        }

        
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


function disableScroll() {
    window.scrollTo(0, 0);
}

// MODAL CANCELAR RESERVA

//Cancelar Reserva
const modalCancelarReserva = document.querySelector('#formCancelarReserva');
const overlayCancelarReserva = document.querySelector('.overlay');
const closeCancelarReserva = document.querySelector('#cerrarCancelarR');


// start function show modal
const hiddenCancelModalReserva = function() {
    modalCancelarReserva.classList.add('hidden');
    overlayCancelarReserva.classList.add('hidden');
    window.removeEventListener("scroll", disableScroll);
};


function ShowModalCancelReservaFunct() {
    modalCancelarReserva.classList.remove('hidden');
    overlayCancelarReserva.classList.remove('hidden');
    window.addEventListener("scroll", disableScroll);

    closeCancelarReserva.addEventListener('click', hiddenCancelModalReserva);
    overlayCancelarReserva.addEventListener('click', hiddenCancelModalReserva);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCancelarReserva.classList.contains('hidden')) {
            hiddenCancelModalReserva();
        }
    });
};

// FIN MODAL CANCELAR RESERVA


function CancelarReserva() {
    let listaReservas = ObtenerListaReservas();
    let numReserva = 0; //llamar datos
    let nombreMascota = 'bobo'; //llamar datos
    let inputCancelar = document.getElementById('motivoCancelar');
    let sMotivoCancelar = inputCancelar.value;
    if (sMotivoCancelar == null || sMotivoCancelar == undefined || sMotivoCancelar == "") {
        inputCancelar.classList.add("error")
        MostrarError('Debe ingresar motivo de cancelación');
        return false;
    } else {
        inputCancelar.classList.remove("error")
        ConfirmarDatos("Reserva cancelada");
    }


    document.getElementById('numReservaCancelar').innerHTML = numReserva;
    document.getElementById('nombreReservaCancelar').innerHTML = nombreMascota;


    for (let i = 0; i < listaReservas.length; i++) {
        if (listaCitas[i][1] == numReserva) {
            listaCitas[i][5] = "Cancelar"
        }

    }
}

//alarms
function MostrarError(txtError) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: txtError,
    })
}

function ConfirmarDatos(txtConfirmar) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: txtConfirmar,
        showConfirmButton: false,
        timer: 1500
    })
}




//MODAL CREAR RESERVA

const modalCrearReserva = document.querySelector('#formCrearReserva');
const overlay = document.querySelector('.overlay');
const closeCrearReserva = document.querySelector('#cerrarModalReserva');
const showCrearReserva = document.getElementById('show-crear-reserva');
const closeCrearReserva2 = document.querySelector('#cerrarCrearR');


const hiddenCrearModal = function() {
    modalCrearReserva.classList.add("hidden");
    overlay.classList.add("hidden");
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalCrearFunct() {
    modalCrearReserva.classList.remove("hidden");
    overlay.classList.remove("hidden");
    location.href = "#top-page";
    window.addEventListener("scroll", disableScroll);

    closeCrearReserva.addEventListener('click', hiddenCrearModal);
    closeCrearReserva2.addEventListener('click', hiddenCrearModal);
    overlay.addEventListener('click', hiddenCrearModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCrearReserva.classList.contains('hidden')) {
            hiddenCrearModal();
        }
    });
};

showCrearReserva.addEventListener('click', ShowModalCrearFunct);

// FIN MODAL CREAR RESERVA