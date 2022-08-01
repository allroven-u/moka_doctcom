let star = document.querySelectorAll('.star')
for (let i = 0; i <= 4; i++) {
    star[i].starval = i + 1
    star[i].addEventListener('click', function(o) {
        for (let y = 0; y <= i; y++) {
            star[y].classList.add('color')
        }
    })
}


let inputObservacion = document.getElementById('txtObservacionesR');
let inputDiagnostico = document.getElementById('txtDiagnosticoR');
let inputCobro = document.getElementById('txtCobroR');

let btnEnviar = document.getElementById('EnviarR');
btnEnviar.addEventListener('click', GuardarDatosReserva);


function GuardarDatosReserva() {

    if (validarGuardarDatosR() == true) {
        ConfirmarDatosR()



    }
}


function validarGuardarDatosR() {
    let sObservacion = inputObservacion.value;
    let sDiagnostico = inputDiagnostico.value;
    let nCobro = inputCobro.value;


    if (sObservacion == null || sObservacion == undefined || sObservacion == "") {
        inputObservacion.classList.add("error")
        MostrarError();
        return false;
    } else {
        inputObservacion.classList.remove("error")
    }
    if (sDiagnostico == null || sDiagnostico == undefined || sDiagnostico == "") {
        inputDiagnostico.classList.add("error")
        MostrarError();
        return false;
    } else {
        inputDiagnostico.classList.remove("error")
    }
    if (nCobro == null || nCobro == undefined || nCobro == "") {
        inputCobro.classList.add("error")
        MostrarError();
        return false;
    } else {
        inputCobro.classList.remove("error")
    }
    return true;
}

function MostrarError() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Dato Requerido!',
    })
}

function ConfirmarDatosR() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos guardados',
        showConfirmButton: false,
        timer: 2000
    })
}