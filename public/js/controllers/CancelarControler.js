//Cancelar Cita
const modalCancelarCita = document.querySelector('.form-cancelar-cita');
const overlayCancelar = document.querySelector('.overlay');
const closeCancelarCita = document.querySelector('.btn-cancelar-cita');


//SHOW CREAR CITA
const hiddenCancelModal = function() {
    modalCancelarCita.classList.add('hidden');
    overlayCancelar.classList.add('hidden');
};

// start function show modal
function ShowModalCancelFunct() {
    modalCancelarCita.classList.remove('hidden');
    overlayCancelar.classList.remove('hidden');

    closeCancelarCita.addEventListener('click', hiddenCancelModal);
    overlayCancelar.addEventListener('click', hiddenCancelModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCancelarCita.classList.contains('hidden')) {
            hiddenCancelModal();
        }
    });
};


function CancelarCita() {
    let listaCitas = ObtenerListaCitas();
    let numCita = 0;
    let nombreMascota = 'bobo';
    let inputCancelar = document.getElementById('motivoCancelar');
    let sMotivoCancelar = inputCancelar.value;
    if (sMotivoCancelar == null || sMotivoCancelar == undefined || sMotivoCancelar == "") {
        inputCancelar.classList.add("error")
        MostrarError();
        return false;
    } else {
        inputCancelar.classList.remove("error")
        ConfirmarDatos();
    }


    document.getElementById('numCitaCancelar').innerHTML = numCita;
    document.getElementById('nombreCitaCancelar').innerHTML = nombreMascota;


    for (let i = 0; i < listaCitas.length; i++) {
        if (listaCitas[i][1] == numCita) {
            listaCitas[i][5] = "Cancelar"
        }

    }
}





//Cancelar Reserva
const modalCancelarReserva = document.querySelector('.form-cancelar-reserva');
const overlayCancelarReserva = document.querySelector('.overlay');
const closeCancelarReserva = document.querySelector('.btn-cancelar-reserva');


// start function show modal
const hiddenCancelModalReserva = function() {
    modalCancelarReserva.classList.add('hidden');
    overlayCancelarReserva.classList.add('hidden');
};


function ShowModalCancelReservaFunct() {
    modalCancelarReserva.classList.remove('hidden');
    overlayCancelarReserva.classList.remove('hidden');

    closeCancelarReserva.addEventListener('click', hiddenCancelModalReserva);
    overlayCancelarReserva.addEventListener('click', hiddenCancelModalReserva);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCancelarReserva.classList.contains('hidden')) {
            hiddenCancelModalReserva();
        }
    });
};


function CancelarReserva() {
    let listaReservas = ObtenerListaReservas();
    let numReserva = 0; //llamar datos
    let nombreMascota = 'bobo'; //llamar datos
    let inputCancelar = document.getElementById('motivoCancelar');
    let sMotivoCancelar = inputCancelar.value;
    if (sMotivoCancelar == null || sMotivoCancelar == undefined || sMotivoCancelar == "") {
        inputCancelar.classList.add("error")
        MostrarError();
        return false;
    } else {
        inputCancelar.classList.remove("error")
        ConfirmarDatos();
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
function MostrarError() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe ingresar motivo de cancelación',
    })
}

function ConfirmarDatos() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cita por cancelar',
        showConfirmButton: false,
        timer: 1500
    })
}