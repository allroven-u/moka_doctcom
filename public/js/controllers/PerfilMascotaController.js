'use strict';
let txtMascota = document.getElementById('TxtMascotaM');
let txtDuennoM = document.getElementById('txtDuennoM');
let txtDireccionM = document.getElementById('txtDireccionM');
let txtEdadM = document.getElementById('txtEdadM');
let txtCalificacionM = document.getElementById('txtCalificacionM');
let txtObservacionesM = document.getElementById('txtObservacionesM');

window.addEventListener('load', () => {
    let mascota = getMascotasArray();
    let usuario = GetSesion();
    txtDuennoM.textContent = usuario.Nombre;
    txtDireccionM.textContent = usuario.Direccion;
    console.log(mascota);
    //txtMascota.textContent = mascota.NombreMascota;


    cargaJsonCitas();
    cargaJson();
    setTimeout(() => { ImprimirListaCitas(); }, 1000);
});




function ImprimirListaCitas() {
    let tbody = document.getElementById('tbbody-ultimas-citas');

    let listaCitas = getCitasArray();

    console.log(listaCitas);

    tbody.innerHTML = '';

    for (let i = 0; i < listaCitas.length; i++) {

        let cita = listaCitas[i];
        let veterinario = buscaUsuarioID(cita.IdentificacionVeterinario);

        let fila = tbody.insertRow();
        let celdaNumCita = fila.insertCell();
        let celdaMascota = fila.insertCell();
        let celdaVeterinario = fila.insertCell();
        let celdaFecha = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaNumCita.innerHTML = cita.NumeroCita;
        celdaNumCita.classList.add('h-citas');
        celdaMascota.innerHTML = cita.NombreMascota;
        celdaMascota.classList.add('h-citas');
        celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;
        celdaVeterinario.classList.add('h-citas');
        celdaFecha.innerHTML = cita.FechaHora;
        celdaFecha.classList.add('h-citas');
        celdaEstado.innerHTML = cita.Estado;
        celdaEstado.classList.add('Estado');
        celdaEstado.classList.add('h-citas');


    }
    let EstadoCita = document.querySelectorAll('.Estado');
    VerEstado(EstadoCita);

};

function VerEstado(EstadoCita) {

    for (let i = 0; i < EstadoCita.length; i++) {
        let sEstadoCita = EstadoCita[i].innerHTML;
        if (sEstadoCita == 'AGENDADA') {
            EstadoCita[i].classList.add("AGENDADA")
        }
        if (sEstadoCita == 'CANCELADA') {
            EstadoCita[i].classList.add("CANCELADA")

        }
        if (sEstadoCita == 'FINALIZADA') {
            EstadoCita[i].classList.add("FINALIZADA")

        }
    }
}


const btnAnnadirMascota = document.getElementById('annadir-mascota');
const modalRegisMascot = document.querySelector('.form-registro-mascota');
const overlayRegistroM = document.querySelector('.overlay');
const closeModalMascota = document.getElementById('btnCancelarRegistroM');




const hiddenRegistroM = function() {
    modalRegisMascot.classList.add('hidden');
    overlayRegistroM.classList.add('hidden');
};

// start function show modal
function ShowModalRegistroM() {
    modalRegisMascot.classList.remove('hidden');
    overlayRegistroM.classList.remove('hidden');

    closeModalMascota.addEventListener('click', hiddenRegistroM);
    overlayRegistroM.addEventListener('click', hiddenRegistroM);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalRegisMascot.classList.contains('hidden')) {
            hiddenRegistroM();
        }
    });
};

btnAnnadirMascota.addEventListener('click', function() {
    ShowModalRegistroM();
});