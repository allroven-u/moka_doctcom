'use strict';


// const showPagar = document.getElementById('Pagar');
// const modalPago = document.querySelector('.form-pago-tarjeta');
// const closeModalPago = document.querySelector('.btn-cancerlar-tarjeta');
// const overlay = document.querySelector('.overlay');

// const hiddenPagar = function() {
//     modalPago.classList.add('hidden');
//     overlay.classList.add('hidden');
// };

// // start function show modal
// function ShowModalPagoFunct() {
//     modalPago.classList.remove('hidden');
//     overlay.classList.remove('hidden');

//     closeModalPago.addEventListener('click', hiddenPagar);
//     overlay.addEventListener('click', hiddenPagar);
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && !modalPago.classList.contains('hidden')) {
//             hiddenPagar();
//         }
//     });
// };

// // showPagar.addEventListener('click', function() {
// //     ShowModalPagoFunct();
// // });


// //////////////////////////TARJETAS///////////////////////

// let inputNombreTitular = document.getElementById("txtTitular");
// let inputNumTarjeta = document.getElementById("numTarjeta");
// let inputNumCVV = document.getElementById("txtCvv");
// let inputMesVenc = document.getElementById("mes_vencimiento");
// let inputYearVenc = document.getElementById("year_vencimiento");

// let tipoVisa = document.getElementById("imgVisa");
// let tipoMaster = document.getElementById("imgMaster");
// let tipoAmex = document.getElementById("imgAmex");

// let actualDate = new Date();
// let actualYear = actualDate.getFullYear();
// let actualMonth = actualDate.getMonth();
// var cantCVV;



// function RealizarPago(){
//     if(ValidarDatostarjeta() == true){
//         ConfirmarDatosT();
//     }
// }

// function ValidarDatostarjeta(){
//     let sNombreTitular = inputNombreTitular.value;
//     let sNumTarjeta = inputNumTarjeta.value;
//     let sNumCVV = inputNumCVV.value;
//     let nMesV = inputMesVenc.value;
//     let nYearV = inputYearVenc.value;

//     if (sNombreTitular == null || sNombreTitular == undefined || sNombreTitular == "") {
//         inputNombreTitular.classList.add("TError");
//         MostrarErrorT();
//         return false;
//     } else {
//         inputNombreTitular.classList.remove("TError");
//     }
//     if (sNumTarjeta == null || sNumTarjeta == undefined || sNumTarjeta == "" ) {
//         inputNumTarjeta.classList.add("TError");
//         MostrarErrorT();
//         return false;
//     }
//     if(ValidarTipoTarjeta() == true){
//             inputNumTarjeta.classList.remove("TError");
//     }else{
//         return false;
//     }
//     if (sNumCVV == null || sNumCVV == undefined || sNumCVV == "") {
//         inputNumCVV.classList.add("TError");
//         MostrarErrorT();
//         return false;
//     } else {
//         console.log("cvv "+sNumCVV);
//         if(sNumCVV.length!=cantCVV){
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'CVV incorrecto',
//             });
//             return false;
//         }else{
//             inputNumCVV.classList.remove("TError");
//         }
        
//     }
//     if (nMesV == null || nMesV == undefined || nMesV == "") {
//         inputMesVenc.classList.add("TError");
//         MostrarErrorT();
//         return false;
//     } else {
//         inputMesVenc.classList.remove("TError");
//     }
//     if (nYearV == null || nYearV == undefined || nYearV == "") {
//         inputYearVenc.classList.add("TError");
//         MostrarErrorT();
//         return false;
//     } else {
//         inputYearVenc.classList.remove("TError");
//     }
//     if (Number(nYearV) == actualYear ) {
//         if(Number(nMesV)<=actualMonth){
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Tarjeta Vencida',
                
//             });
//             inputMesVenc.classList.add("TError");
//             inputYearVenc.classList.add("TError");
//             return false;

//         }else if(Number(nYearV) < actualYear){
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Tarjeta Vencida',
//             });
//             inputMesVenc.classList.add("TError");
//             inputYearVenc.classList.add("TError");
//             return false;
//         }   
//     }else{
//         inputMesVenc.classList.remove("TError");
//         inputYearVenc.classList.remove("TError");
//     }
//     return true;
// }

// function ValidarTipoTarjeta(){
//     let nTarjeta = inputNumTarjeta.value;
//     ///////visa////////
//     if(nTarjeta.match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)){
//         tipoVisa.classList.remove("hidden");
//         tipoMaster.classList.add("hidden");
//         tipoAmex.classList.add("hidden");
//         cantCVV =3;
//         return true;
//     ///////mastercard/////////////    
//     }else if(nTarjeta.match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)){
//         tipoVisa.classList.add("hidden");
//         tipoMaster.classList.remove("hidden");
//         tipoAmex.classList.add("hidden");
//         cantCVV =3;
//         return true;
//         ///////amex/////////////
//     }else if(nTarjeta.match(/^3[4-7]\d{2}-?\d{6}-?\d{5}$/)){
//         tipoVisa.classList.add("hidden");
//         tipoMaster.classList.add("hidden");
//         tipoAmex.classList.remove("hidden");
//         cantCVV =4;
//         return true;
//     }
//     else{
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'numero de tarjeta invalido',
//         });
//         tipoVisa.classList.add("hidden");
//         tipoMaster.classList.add("hidden");
//         tipoAmex.classList.add("hidden");
//         return false;
//     }

// }

// function MostrarErrorT() {
//     Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Dato requerido',
//     })
// }

// function ConfirmarDatosT() {
//     Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Pago Realizado',
//         showConfirmButton: false,
//         timer: 1500
//     })
// }


//////////////////////////////pagos factura/////////////////////////////////////

let inputNombreTitularPago = document.getElementById("txtTitularPago");
let inputNumTarjetaPago = document.getElementById("numTarjetaPago");
let inputNumCVVPago = document.getElementById("txtCvvPago");
let inputMesVencPago = document.getElementById("mes_vencimientoPago");
let inputYearVencPago = document.getElementById("year_vencimientoPago");
let btnPagarFact = document.getElementById("btnPagarFactura");
btnPagarFact.addEventListener("click",PagarFactura);

let tipoVisa = document.getElementById("imgVisa");
let tipoMaster = document.getElementById("imgMaster");
let tipoAmex = document.getElementById("imgAmex");

let actualDate = new Date();
let actualYear = actualDate.getFullYear();
let actualMonth = actualDate.getMonth();
var cantCVV;


function PagarFactura(){
    let sNombreTitular =inputNombreTitularPago.value;
    let numTarjeta =inputNumTarjetaPago.value;
    let sCVV =inputNumCVVPago.value;
    let sMesVenc =inputMesVencPago.value;
    let sYearVenc =inputYearVencPago.value;

    if(ValidarMetodoPago(sNombreTitular,numTarjeta,sCVV,sMesVenc,sYearVenc)){

        ConfirmarDatos("Realizado con Exito");
    }

}

function ValidarMetodoPago(pNombreTitular,pnumTarjeta,pCVV,pMesVenc,pYearVenc){


    if (pnumTarjeta == null || pnumTarjeta == undefined || pnumTarjeta == "" ) {
        inputNumTarjetaPago.classList.add("TError");
        MostrarError("El numero de tarjeta es requerido!");
        return false;
    }
    if(ValidarTipoTarjetaPago(pnumTarjeta) == true){
        inputNumTarjetaPago.classList.remove("TError");
    }else{
        return false;
    }

    if (pNombreTitular == null || pNombreTitular == undefined || pNombreTitular == "") {
        inputNombreTitularPago.classList.add("TError");
        MostrarError("El nombre de titular es requerido!");
        return false;
    } else {
        inputNombreTitularPago.classList.remove("TError");
    }


    if (pCVV == null || pCVV == undefined || pCVV == "") {
        inputNumCVVPago.classList.add("TError");
        MostrarError("El numero de CVV es requerido!");
        return false;
    } else {
        console.log("cvv "+pCVV);
        if(pCVV.length!=cantCVV){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'CVV incorrecto',
            });
            return false;
        }else{
            inputNumCVVPago.classList.remove("TError");
        }
        
    }
    if (pMesVenc == null || pMesVenc == undefined || pMesVenc == "") {
        inputMesVencPago.classList.add("TError");
        MostrarError("El mes de vencimiento es requerido!");
        return false;
    } else {
        inputMesVencPago.classList.remove("TError");
    }
    if (pYearVenc == null || pYearVenc == undefined || pYearVenc == "") {
        inputYearVencPago.classList.add("TError");
        MostrarError("El año de vencimiento es requerido!");
        return false;
    } else {
        inputYearVencPago.classList.remove("TError");
    }
    if (Number(pYearVenc) == actualYear ) {
        if(Number(pMesVenc)<=actualMonth){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tarjeta Vencida',
                
            });
            inputMesVencPago.classList.add("TError");
            inputYearVencPago.classList.add("TError");
            return false;

        }else if(Number(pYearVenc) < actualYear){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tarjeta Vencida',
            });
            inputMesVencPago.classList.add("TError");
            inputYearVencPago.classList.add("TError");
            return false;
        }   
    }else{
        inputMesVenc.classList.remove("TError");
        inputYearVenc.classList.remove("TError");
    }
    return true;
}

function ValidarTipoTarjetaPago(pNumTarjeta){
    let nTarjeta = pNumTarjeta;
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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'numero de tarjeta invalido',
        });
        tipoVisa.classList.add("hidden");
        tipoMaster.classList.add("hidden");
        tipoAmex.classList.add("hidden");
        return false;
    }

}


///////////////////////modal pagoFactura/////////////////////////

const showPagarFact = document.getElementById('btnMetodosPago');
const modalPagoFact = document.querySelector('.form-pago-tarjetaFactura');
const closeModalPagoFact = document.getElementById('btnCancelarPago');
let cerrarModal = document.querySelector(".cerrarModalX-tarjetaPago")
// const overlay = document.querySelector('.overlay');
showPagarFact.addEventListener('click', function() {
    ShowModalPagoFactFunct();
});
const hiddenPagarFact = function() {
    modalPagoFact.classList.add('hidden');
    overlay.classList.add('hidden');
};

// start function show modal
function ShowModalPagoFactFunct() {
    modalPagoFact.classList.remove('hidden');
    overlay.classList.remove('hidden');
    cerrarModal.addEventListener('click', hiddenPagarFact);
    closeModalPagoFact.addEventListener('click', hiddenPagarFact);
    overlay.addEventListener('click', hiddenPagarFact);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalPago.classList.contains('hidden')) {
            hiddenPagarFact();
        }
    });
};
