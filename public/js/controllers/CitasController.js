'use strict'

var listaCitas = [];

window.addEventListener('load',GetListaCitas());

async function GetListaCitas(params) {
    
    let listaCitas = await getCitasArray();
    if(listaCitas.length >0){
       ImprimirListaCitas();
       // console.log(listaCitas);
    }
}


 function ImprimirListaCitas(){

    let tThead = document.getElementById('tTheadCitas');
    let tbody = document.getElementById('tBodyCitas');

    tbody.innerHTML = '';
    tThead.innerHTML = '';

    // thead
    let thRow = tThead.insertRow();

    let celNumCita = thRow.insertCell();
    celNumCita.innerHTML = 'Num. Cita';

    // let celPropietario= thRow.insertCell();
    // celPropietario.innerHTML = 'Propietario';

    let celMascota = thRow.insertCell();
    celMascota.innerHTML = 'Mascota';

    // let celVeterinario = thRow.insertCell();
    // celVeterinario.innerHTML = 'Veterinario';

    let celFecha = thRow.insertCell();
    celFecha.innerHTML = 'Fecha';

    let celEstado = thRow.insertCell();
    celEstado.innerHTML = 'Estado';

    // let celAcciones = thRow.insertCell();
    // celAcciones.innerHTML = 'Acciones';
    

    for (let i = 0; i < listaCitas.length; i++) {

        
        let  cita = listaCitas[i];
        console.log(cita.NombreMascota);
       // let veterinario = buscaUsuarioID(cita.IdentificacionVeterinario);
       // let propietario = buscaUsuarioID(cita.IdentificacionUsurio) ;  

        let fila = tbody.insertRow();

        let celdaNumCita = fila.insertCell();
        celdaNumCita.innerHTML = cita.NumeroCita;

        // let celdaPropietario = fila.insertCell();
        // celdaPropietario.innerHTML = propietario.Nombre + ' ' + propietario.Apellido1 + ' ' + propietario.Apellido2;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = cita.NombreMascota;

        // let celdaVeterinario = fila.insertCell();
        // celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;

        let celdaFecha= fila.insertCell();
        celdaFecha.innerHTML = cita.FechaHora;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = cita.Estado;
        celdaEstado.classList.add('Estado');

    //     let celdaBoton = fila.insertCell();
        
    //     let EstadoCitaif = document.querySelectorAll('.Estado');
    //     if (EstadoCitaif[i].innerHTML == 'AGENDADA' ) {
    //     let BotonV = document.createElement('a');
    //     BotonV.setAttribute('href','/public/VerCitaDatos.html')
    //     let iconoV =document.createElement('i');
    //     iconoV.classList.add("fa-solid")
    //     iconoV.classList.add("fa-eye")
    //     iconoV.classList.add("btnV")
    //     BotonV.appendChild(iconoV);
    //     celdaBoton.appendChild(BotonV);
        

    //     let Boton = document.createElement('a');
    //     Boton.setAttribute('href','/public/CompletarCita.html')
    //     let icono =document.createElement('i');
    //     icono.classList.add("fa-solid")
    //     icono.classList.add("fa-pen-to-square")
    //     icono.classList.add("btnEd")
    //     Boton.appendChild(icono);
    //     celdaBoton.appendChild(Boton);

    //     let BotonC = document.createElement('a');
    //     BotonC.setAttribute('onclick','ShowModalCancelFunct()');
    //     let iconoC =document.createElement('i');
    //     iconoC.classList.add("fa-solid")
    //     iconoC.classList.add("fa-circle-xmark")
    //     iconoC.classList.add("btnCa")
    //     BotonC.appendChild(iconoC);
    //     celdaBoton.appendChild(BotonC);
    //     }else{
    //     let BotonV = document.createElement('a');
    //     BotonV.setAttribute('href','#')
    //     let iconoV =document.createElement('i');
    //     iconoV.classList.add("fa-solid")
    //     iconoV.classList.add("fa-eye")
    //     iconoV.classList.add("btnV")
    //     BotonV.appendChild(iconoV);
    //     celdaBoton.appendChild(BotonV);
    //     }

        
     }
    // let EstadoCita = document.querySelectorAll('.Estado');
    //     console.log(EstadoCita.length);
    //     VerEstado(EstadoCita);
  }


// function VerEstado(EstadoCita){
    
//     for (let i = 0; i < EstadoCita.length; i++) {
//     let sEstadoCita = EstadoCita[i].innerHTML;    
//     console.log(sEstadoCita)
//     if (sEstadoCita == 'AGENDADA'){
//         EstadoCita[i].classList.add("AGENDADA")
        
//     }
//     if (sEstadoCita == 'CANCELADA'){
//         EstadoCita[i].classList.add("CANCELADA")
       
//     }
//     if (sEstadoCita == 'FINALIZADA'){
//         EstadoCita[i].classList.add("FINALIZADA")
        

//     }   
//     }
// }


let crearCitaModal = document.getElementById('formCrearCita')
let overlay = document.querySelector('.overlay')
let btnCrearCita = document.getElementById('show-crear-cita').addEventListener('click',ShowModalCitaFunct);
let btnCancelarCita = document.querySelector('#CancelarCita');
btnCancelarCita.addEventListener('click',hiddenModalCitaFunct)

function ShowModalCitaFunct() {
    crearCitaModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    location.href = "#top-page";
    window.addEventListener("scroll", disableScroll);
};

function hiddenModalCitaFunct() {
    crearCitaModal.classList.add("hidden");
    overlay.classList.add("hidden");
    window.removeEventListener("scroll", disableScroll);
    limpiarForm();
};

function disableScroll() {
    window.scrollTo(0, 0);
}
const limpiarForm = function () {
    crearCitaModal.reset();
}
