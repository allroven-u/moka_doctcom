let star = document.querySelectorAll('.star')
for (let i = 0; i <= 4; i++) {
    star[i].starval = i + 1
    star[i].addEventListener('click', function(e) {
        for (let y = 0; y <= i; y++) {
            star[y].classList.add('color')
        }
    })
}


let inputDescripcion = document.getElementById('txtDescripcion');
let inputObservacion = document.getElementById('txtObservaciones');
let inputDiagnostico = document.getElementById('txtDiagnostico');
let inputCobro = document.getElementById('txtCobro');

let btnEnviar = document.getElementById('Enviar');
btnEnviar.addEventListener('click',GuardarDatosCita);


function GuardarDatosCita(){
    
    if(validarGuardarDatos() == true){
        ConfirmarDatos()



    }
}


function validarGuardarDatos(){
    let sDescripcion = inputDescripcion.value;
    let sObservacion = inputObservacion.value;
    let sDiagnostico = inputDiagnostico.value;
    let nCobro = inputCobro.value;

    if (sDescripcion == null || sDescripcion == undefined || sDescripcion == ""){
        inputDescripcion.classList.add("error")
        MostrarError();
        return false;
    }else{
        inputDescripcion.classList.remove("error")
    }
    if (sObservacion == null || sObservacion == undefined || sObservacion == ""){
        inputObservacion.classList.add("error")
        MostrarError();
        return false;
    }else{
        inputObservacion.classList.remove("error")
    }
    if (sDiagnostico == null || sDiagnostico == undefined || sDiagnostico == ""){
        inputDiagnostico.classList.add("error")
        MostrarError();
        return false;
    }else{
        inputDiagnostico.classList.remove("error")
    }
    if (nCobro == null || nCobro == undefined || nCobro == ""){
        inputCobro.classList.add("error")
        MostrarError();
        return false;
    }else{
        inputCobro.classList.remove("error")
    }
    return true;
}

function MostrarError(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Dato Requerido!',
    })
}
function ConfirmarDatos(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos guardados',
        showConfirmButton: false,
        timer: 2000
      })
}