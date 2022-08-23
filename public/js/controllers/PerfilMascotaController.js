'use strict';
let txtMascota = document.getElementById('TxtMascotaM');
let txtDuennoM = document.getElementById('txtDuennoM');
let txtDireccionM = document.getElementById('txtDireccionM');
let txtEdadM = document.getElementById('txtEdadM');
let txtCalificacionM = document.getElementById('txtCalificacionM');
let txtObservacionesM = document.getElementById('txtObservacionesM');


let listaMascotas = [];
let userSessionM = GetSesion();



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
const closeModalMascota2 = document.getElementById('cerrarAnnadirM');

function disableScroll() {
    window.scrollTo(0, 0);
}




const hiddenRegistroM = function () {
    modalRegisMascot.classList.add('hidden');
    overlayRegistroM.classList.add('hidden');
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalRegistroM() {
    modalRegisMascot.classList.remove('hidden');
    overlayRegistroM.classList.remove('hidden');
    window.addEventListener("scroll", disableScroll);

    closeModalMascota.addEventListener('click', hiddenRegistroM);
    closeModalMascota2.addEventListener('click', hiddenRegistroM);
    overlayRegistroM.addEventListener('click', hiddenRegistroM);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalRegisMascot.classList.contains('hidden')) {
            hiddenRegistroM();
        }
    });
};

btnAnnadirMascota.addEventListener('click', function () {
    ShowModalRegistroM();
});

GetlistaMascota()

async function GetlistaMascota() {
    let result = await getMascotasArray(userSessionM.Identificacion);
    if (result != {} && result.resultado == true) {
      listaMascotas = result.MascotasDB;
      await imprimirMascotas();
    }
}

 async function imprimirMascotas(){
    for(let i = 0; i < listaMascotas.length; i++){
        console.log(listaMascotas[i]);
        let perfiles = document.querySelector('.perfil-contenido');
        let mainDiv = document.createElement('div');
        let firstDiv = document.createElement('div');
        let secondDiv = document.createElement('div');
        let createP = document.createElement('p');
        let createButton = document.createElement('button');

        perfiles.appendChild(mainDiv);
        mainDiv.classList.add('box-usuario_img');
        mainDiv.classList.add('cards-mascotas');
        mainDiv.appendChild(firstDiv);
        firstDiv.classList.add('box-img');
        firstDiv.classList.add('border-radius');
        mainDiv.appendChild(secondDiv);
        secondDiv.classList.add('usuario');
        secondDiv.classList.add('border-radius');
        secondDiv.classList.add('name-mascota');
        secondDiv.appendChild(createP);
        createP.setAttribute('id', 'TxtMascotaM');
        createP.textContent = listaMascotas[i].NombreMascota;
        mainDiv.appendChild(createButton);
        createButton.classList.add('usuario');
        createButton.classList.add('border-radius');
        createButton.classList.add('annadir');
        createButton.textContent = 'Ver Perfil'
        createButton.addEventListener('click', function(){
            location.href = './perfilMascota.html';
        })


    }
}


