'use strict';

const showAgregarTajeta = document.querySelector('.btn-agregar-metodo-pago');
const modalAgregarTarjeta = document.querySelector('.form-pago-tarjeta');
const closeModalAgregarTarjeta = document.querySelector('.btn-cancerlar-tarjeta');
const overlay = document.querySelector('.overlay');
const cerrarModalIcon = document.querySelector('.cerrarModalX-tarjeta');

function disableScroll() {
    window.scrollTo(0, 0);
}
const limpiarFormAgregar = function () {
    modalAgregarTarjeta.reset();
}

const hiddenAgregar = function() {
    modalAgregarTarjeta.classList.add('hidden');
    overlay.classList.add('hidden');
    window.removeEventListener("scroll", disableScroll);
    limpiarFormAgregar();
};

// start function show modal
function ShowModalAgregarTarjetaFunct() {
    modalAgregarTarjeta.classList.remove('hidden');
    overlay.classList.remove('hidden');
    window.addEventListener("scroll", disableScroll);

    closeModalAgregarTarjeta.addEventListener('click', hiddenAgregar);
    cerrarModalIcon.addEventListener('click', hiddenAgregar);
    overlay.addEventListener('click', hiddenAgregar);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalAgregarTarjeta.classList.contains('hidden')) {
            hiddenAgregar();
        }
    });
};

showAgregarTajeta.addEventListener('click', function() {
    ShowModalAgregarTarjetaFunct();
});


//////////////////////////TARJETAS///////////////////////


let inputNombreTitular = document.getElementById("txtTitular");
let inputNumTarjeta = document.getElementById("numTarjeta");
let inputNumCVV = document.getElementById("txtCvv");
let inputMesVenc = document.getElementById("mes_vencimiento");
let inputYearVenc = document.getElementById("year_vencimiento");



let tipoVisa = document.getElementById("imgVisa");
let tipoMaster = document.getElementById("imgMaster");
let tipoAmex = document.getElementById("imgAmex");

let actualDate = new Date();
let actualYear = actualDate.getFullYear();
let actualMonth = actualDate.getMonth();
var cantCVV;



function RealizarPago(){
    if(ValidarDatostarjeta() == true){
        ConfirmarDatosT();
    }
}

function ValidarDatostarjeta(){
    let sNombreTitular = inputNombreTitular.value;
    let sNumTarjeta = inputNumTarjeta.value;
    let sNumCVV = inputNumCVV.value;
    let nMesV = inputMesVenc.value;
    let nYearV = inputYearVenc.value;

    if (sNombreTitular == null || sNombreTitular == undefined || sNombreTitular == "") {
        inputNombreTitular.classList.add("TError");
        MostrarErrorT();
        return false;
    }
    if (sNombreTitular.match(/^[a-zA-Z,.' -]+$/)) {
        inputNombreTitular.classList.remove("TError");
    } else {
        inputNombreTitular.classList.add("TError");
        MostrarError("¡El nombre de titular de la tarjeta no puede contener caracteres especiales ni números!");
        return false;
    }
    if (sNumTarjeta == null || sNumTarjeta == undefined || sNumTarjeta == "" ) {
        inputNumTarjeta.classList.add("TError");
        MostrarErrorT();
        return false;
    }
    if(ValidarTipoTarjeta() == true){
            inputNumTarjeta.classList.remove("TError");
    }else{
        return false;
    }
    if (sNumCVV == null || sNumCVV == undefined || sNumCVV == "") {
        inputNumCVV.classList.add("TError");
        MostrarErrorT();
        return false;
    } else {
        console.log("cvv "+sNumCVV);
        if(sNumCVV.length!=cantCVV){
            inputNumCVV.classList.add("TError");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡CVV incorrecto!',
            });
            return false;
        }else{
            inputNumCVV.classList.remove("TError");
        }

    }
    if (nMesV == null || nMesV == undefined || nMesV == "") {
        inputMesVenc.classList.add("TError");
        MostrarErrorT();
        return false;
    } else {
        inputMesVenc.classList.remove("TError");
    }
    if (nYearV == null || nYearV == undefined || nYearV == "") {
        inputYearVenc.classList.add("TError");
        MostrarErrorT();
        return false;
    } else {
        inputYearVenc.classList.remove("TError");
    }
    if (Number(nYearV) == actualYear ) {
        if(Number(nMesV)<=actualMonth){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Tarjeta vencida!',

            });
            inputMesVenc.classList.add("TError");
            inputYearVenc.classList.add("TError");
            return false;

        }else if(Number(nYearV) < actualYear){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Tarjeta vencida!',
            });
            inputMesVenc.classList.add("TError");
            inputYearVenc.classList.add("TError");
            return false;
        }   
    }else{
        inputMesVenc.classList.remove("TError");
        inputYearVenc.classList.remove("TError");
    }
    return true;
}













function ValidarTipoTarjeta(){
    let nTarjeta = inputNumTarjeta.value;
    ///////visa////////
    if(nTarjeta.match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)){
        tipoVisa.classList.remove("hidden");
        tipoMaster.classList.add("hidden");
        tipoAmex.classList.add("hidden");
        cantCVV =3;
        return true;
    ///////mastercard/////////////    
    }else if(nTarjeta.match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)){
        tipoVisa.classList.add("hidden");
        tipoMaster.classList.remove("hidden");
        tipoAmex.classList.add("hidden");
        cantCVV =3;
        return true;
        ///////amex/////////////
    }else if(nTarjeta.match(/^3[4-7]\d{2}-?\d{6}-?\d{5}$/)){
        tipoVisa.classList.add("hidden");
        tipoMaster.classList.add("hidden");
        tipoAmex.classList.remove("hidden");
        cantCVV =4;
        return true;
    }
    else{
        inputNumTarjeta.classList.add("TError");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Número de tarjeta invalido!',
        });
        tipoVisa.classList.add("hidden");
        tipoMaster.classList.add("hidden");
        tipoAmex.classList.add("hidden");
        return false;
    }

}

function MostrarError(txtError) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: txtError,
    })
}

function MostrarErrorT() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Dato requerido!',
    })
}

function ConfirmarDatosT() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Pago realizado!',
        showConfirmButton: false,
        timer: 1500
    })
}
