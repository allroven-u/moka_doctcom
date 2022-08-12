'use strict';

var listaCitas;

window.addEventListener('load', () =>{
     cargaJsonCitas();
     cargaJson(); 
     
     setTimeout(() => {ImprimirListaCitas();}, 1000);
});


function ImprimirListaCitas(){

    let tThead = document.getElementById('tTheadCitas');
    let tbody = document.getElementById('tBodyCitas');

    let listaCitas = getCitasArray();

    tbody.innerHTML = '';
    tThead.innerHTML = '';

    // thead
    let thRow = tThead.insertRow();

    let celNumCita = thRow.insertCell();
    celNumCita.innerHTML = 'Num. Cita';

    let celPropietario= thRow.insertCell();
    celPropietario.innerHTML = 'Propietario';

    let celMascota = thRow.insertCell();
    celMascota.innerHTML = 'Mascota';

    let celVeterinario = thRow.insertCell();
    celVeterinario.innerHTML = 'Veterinario';

    let celFecha = thRow.insertCell();
    celFecha.innerHTML = 'Fecha';

    let celEstado = thRow.insertCell();
    celEstado.innerHTML = 'Estado';

    let celAcciones = thRow.insertCell();
    celAcciones.innerHTML = 'Acciones';
    

    for (let i = 0; i < listaCitas.length; i++) {

        
        let  cita = listaCitas[i];
        let veterinario = buscaUsuarioID(cita.IdentificacionVeterinario);
        let propietario = buscaUsuarioID(cita.IdentificacionUsurio) ;  

        let fila = tbody.insertRow();

        let celdaNumCita = fila.insertCell();
        celdaNumCita.innerHTML = cita.NumeroCita;

        let celdaPropietario = fila.insertCell();
        celdaPropietario.innerHTML = propietario.Nombre + ' ' + propietario.Apellido1 + ' ' + propietario.Apellido2;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = cita.NombreMascota;

        let celdaVeterinario = fila.insertCell();
        celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;

        let celdaFecha= fila.insertCell();
        celdaFecha.innerHTML = cita.FechaHora;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = cita.Estado;
        celdaEstado.classList.add('Estado');

        let celdaBoton = fila.insertCell();
        
        let EstadoCitaif = document.querySelectorAll('.Estado');
        if (EstadoCitaif[i].innerHTML == 'AGENDADA' ) {
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','/public/VerCitaDatos.html')
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid")
        iconoV.classList.add("fa-eye")
        iconoV.classList.add("btnV")
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV);
        

        let Boton = document.createElement('a');
        Boton.setAttribute('href','/public/CompletarCita.html')
        let icono =document.createElement('i');
        icono.classList.add("fa-solid")
        icono.classList.add("fa-pen-to-square")
        icono.classList.add("btnEd")
        Boton.appendChild(icono);
        celdaBoton.appendChild(Boton);

        let BotonC = document.createElement('a');
        BotonC.setAttribute('onclick','ShowModalCancelFunct()');
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


///MODAL CANCELAR CITA///

function disableScroll() {
    window.scrollTo(0, 0);
}

//Cancelar Cita
const modalCancelarCita = document.querySelector('#formCancelarCita');
const overlayCancelar = document.querySelector('.overlay');
const closeCancelarCita = document.querySelector('#cerrarCancelarC');


const hiddenCancelModal = function() {
    modalCancelarCita.classList.add("hidden");
    overlayCancelar.classList.add("hidden");
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalCancelFunct() {
    modalCancelarCita.classList.remove("hidden");
    overlayCancelar.classList.remove("hidden");
    location.href = "#top-page";
    window.addEventListener("scroll", disableScroll);

    closeCancelarCita.addEventListener('click', hiddenCancelModal);
    overlayCancelar.addEventListener('click', hiddenCancelModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCancelarCita.classList.contains('hidden')) {
            hiddenCancelModal();
        }
    });
};

// FIN MODAL CANCELAR CITA



function CancelarCita() {
    let listaCitas = ObtenerListaCitas();
    let numCita = 0;
    let nombreMascota = 'bobo';
    let inputCancelar = document.getElementById('motivoCancelar');
    let sMotivoCancelar = inputCancelar.value;
    if (sMotivoCancelar == null || sMotivoCancelar == undefined || sMotivoCancelar == "") {
        inputCancelar.classList.add("error")
        MostrarError('Debe ingresar motivo de cancelación');
        return false;
    } else {
        inputCancelar.classList.remove("error")
        ConfirmarDatos("Cita cancelada");
    }


    document.getElementById('numCitaCancelar').innerHTML = numCita;
    document.getElementById('nombreCitaCancelar').innerHTML = nombreMascota;


    for (let i = 0; i < listaCitas.length; i++) {
        if (listaCitas[i][1] == numCita) {
            listaCitas[i][5] = "Cancelar"
        }

    }
}


//MODAL CREAR CITA

const modalCrearCita = document.querySelector('#formCrearCita');
const overlay = document.querySelector('.overlay');
const closeCrearCita = document.querySelector('#cerrarModalCita');
const showCrearCita = document.getElementById('showCrearCita');
const closeCrearCita2 = document.querySelector('#cerrarCrearC');


const hiddenCrearModal = function() {
    modalCrearCita.classList.add("hidden");
    overlay.classList.add("hidden");
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalCrearFunct() {
    modalCrearCita.classList.remove("hidden");
    overlay.classList.remove("hidden");
    location.href = "#top-page";
    window.addEventListener("scroll", disableScroll);

    closeCrearCita.addEventListener('click', hiddenCrearModal);
    closeCrearCita2.addEventListener('click', hiddenCrearModal);
    overlayCancelar.addEventListener('click', hiddenCrearModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCrearCita.classList.contains('hidden')) {
            hiddenCrearModal();
        }
    });
};

showCrearCita.addEventListener('click', ShowModalCrearFunct);

// FIN MODAL CREAR CITA
