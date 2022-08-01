let listElements = document.querySelectorAll('.list__button--click');
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector("toggle");
let txtUsuarioLogueado = document.getElementById('TxtUsuarioLogueado');

listElements.forEach(listElement => {
    listElement.addEventListener('click', () => {

        listElement.classList.toggle('arrow');

        let height = 0;
        let menu = listElement.nextElementSibling;
        if (menu.clientHeight == "0") {
            height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;

    })
});

window.addEventListener('load', () => {
    let usuario = GetSesion();
    console.log(usuario.Nombre + ' ' + usuario.Apellido1);
    txtUsuarioLogueado.textContent = usuario.Nombre + ' ' + usuario.Apellido1;
});

function cerrar() {

    if (sidebar.classList.contains(navClose)) {
        sidebar.classList.remove("navClose");
        sidebar.classList.add("nav");
    } else {
        sidebar.classList.remove("nav");
        sidebar.classList.add("navClose");
    }


}


//MOSTRAR LOS MODALES

const modalReserva = document.querySelector('.cuerpoReserva');
const modalCita = document.querySelector('.cuerpoCita');
const overlay = document.querySelector('.overlay');
const showModalCita = document.querySelector('#show-crear-cita');
const showModalReserva = document.querySelector('#show-crear-reservacion');
const closeCita = document.querySelector('.btnCancelarC');
const closeReserva = document.querySelector('.btnCancelarR');


//SHOW CREAR CITA
const hiddenCitaModal = function() {
    modalCita.classList.add('hidden');
    overlay.classList.add('hidden');
};

// start function show modal
function ShowModalCitaFunct() {
    modalCita.classList.remove('hidden');
    overlay.classList.remove('hidden');

    closeCita.addEventListener('click', hiddenCitaModal);
    overlay.addEventListener('click', hiddenCitaModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCita.classList.contains('hidden')) {
            hiddenCitaModal();
        }
    });
};

showModalCita.addEventListener('click', function() {
    ShowModalCitaFunct();
});


//SHOW CREAR RESERVA 
const hiddenReservaModal = function() {
    modalReserva.classList.add('hidden');
    overlay.classList.add('hidden');
};

// start function show modal
function ShowModalReservaFunct() {
    modalReserva.classList.remove('hidden');
    overlay.classList.remove('hidden');

    closeReserva.addEventListener('click', hiddenReservaModal);
    overlay.addEventListener('click', hiddenReservaModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalReserva.classList.contains('hidden')) {
            hiddenReservaModal();
        }
    });
};


showModalReserva.addEventListener('click', function() {
    ShowModalReservaFunct();
});