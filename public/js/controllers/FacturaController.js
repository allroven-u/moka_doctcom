'use strict';

let listaTarjetas = [];
let userSessionT;
userSessionT = GetSesion();

let listaUsuarios = [];
let factura;
var user;
///////////Obtener id url/////////////////
let queryString, urlParams, _id, numFact;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get("_id");
    numFact = urlParams.get("numFact");
}

window.addEventListener("load", async () => {
    await GetlistaUsuarios();
    await GetFactura();
    CargarFactura();
    GetListaTarjetas();
});

console.log(userSessionT);

async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {

        listaUsuarios = result.ListaUsuariosBD;

    }
}

async function GetFactura() {
    let result = await getFactura(numFact);
    if (result != {} && result.resultado == true) {

        factura = result.FacturaDB;
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].Identificacion == factura.IdentificacionUsuario) {
                user = listaUsuarios[i];
                console.log(factura)

            }

        }
    }


}



//////////////////////////////cargar datos factura//////////////////////////

let inputCliente = document.getElementById('nombreClienteFact');
let inputIdCliente = document.getElementById('IdClienteFact');
let inputEmailCliente = document.getElementById('EmailClienteFact');
let inputDieccionCliente = document.getElementById('DireccionClienteFact');
let inputFechaFact = document.getElementById('FechaFact');
let inputnumFact = document.getElementById('numFact');
let tbody = document.getElementById('LineasFactura');
let outSubtotal = document.getElementById('subtotalFact');
let outIVA = document.getElementById('IvaFact');
let outTotal = document.getElementById('TotalFact');


function CargarFactura() {

    let subtotal = 0;
    inputCliente.innerHTML = user.Nombre + " " + user.Apellido;
    inputIdCliente.innerHTML = user.Identificacion;
    inputEmailCliente.innerHTML = user.Email;
    inputDieccionCliente.innerHTML = user.Direccion;
    let fecha = new Date(factura.Fecha);
    inputFechaFact.innerHTML = fecha.getDate() + "-" + fecha.getMonth() + "-" + fecha.getFullYear();
    inputnumFact.innerHTML = factura.NumeroFactura;
    console.log(factura.Lineas.length)
    for (let i = 0; i < factura.Lineas.length; i++) {
        let fila = tbody.insertRow();

        let celdaDescrip = fila.insertCell();
        celdaDescrip.innerHTML = factura.Lineas[i].Descripcion;
        celdaDescrip.classList.add("descrip");

        let celdaUnidad = fila.insertCell();
        celdaUnidad.innerHTML = "Unid";
        celdaDescrip.classList.add("Unid");

        let celdaCantidad = fila.insertCell();
        celdaCantidad.innerHTML = factura.Lineas[i].Cantidad;
        celdaDescrip.classList.add("Unid");

        let celdaPrecio = fila.insertCell();
        celdaPrecio.innerHTML = factura.Lineas[i].PrecioUnitario;
        celdaDescrip.classList.add("Unid");

        let celdaTotal = fila.insertCell();
        celdaTotal.innerHTML = (factura.Lineas[i].PrecioUnitario * factura.Lineas[i].Cantidad);
        subtotal += Number((factura.Lineas[i].PrecioUnitario * factura.Lineas[i].Cantidad));
        celdaDescrip.classList.add("Unid");
    }

    outSubtotal.innerHTML = subtotal;
    outIVA.innerHTML = (subtotal * 0.13);
    outTotal.innerHTML = (subtotal + (subtotal * 0.13))



}






async function GetListaTarjetas() {
    let result = await getFactura(numFact);
    if (result != {} && result.resultado == true) {

        factura = result.FacturaDB;
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].Identificacion == factura.IdentificacionUsuario) {
                user = listaUsuarios[i];
                let tarjetas = user.Tarjetas;
                let select = document.getElementById('seletTarjetas');
                let opcion;
                let valor = 0;
                for (let i = 0; i < tarjetas.length; i++) {
                    opcion = document.createElement("option");
                    valor += 1;
                    opcion.value = valor;
                    opcion.text = tarjetas[i].NumeroTarjeta;
                    select.appendChild(opcion);
                }

                if(Number(select.value) > 0){
                    
                }
                

            }

        }
    }

}






























//////////////////////////////pagos factura/////////////////////////////////////

let inputNombreTitularPago = document.getElementById("txtTitularPago");
let inputNumTarjetaPago = document.getElementById("numTarjetaPago");
let inputNumCVVPago = document.getElementById("txtCvvPago");
let inputMesVencPago = document.getElementById("mes_vencimientoPago");
let inputYearVencPago = document.getElementById("year_vencimientoPago");
let btnPagarFact = document.getElementById("btnPagarFactura");
btnPagarFact.addEventListener("click", PagarFactura);
let btnsFacturas = document.getElementById("buttonsFact");

let tipoVisa = document.getElementById("imgVisa");
let tipoMaster = document.getElementById("imgMaster");
let tipoAmex = document.getElementById("imgAmex");

let actualDate = new Date();
let actualYear = actualDate.getFullYear();
let actualMonth = actualDate.getMonth();
var cantCVV;


function PagarFactura() {
    let sNombreTitular = inputNombreTitularPago.value;
    let numTarjeta = inputNumTarjetaPago.value;
    let sCVV = inputNumCVVPago.value;
    let sMesVenc = inputMesVencPago.value;
    let sYearVenc = inputYearVencPago.value;

    if (ValidarMetodoPago(sNombreTitular, numTarjeta, sCVV, sMesVenc, sYearVenc) == true) {
        hiddenPagarFact();
        let success = document.querySelector('#success');
        success.classList.remove('hidden');
        btnsFacturas.classList.add('hidden');
        ConfirmarDatos("Realizado con Exito");
    }

}

function ValidarMetodoPago(pNombreTitular, pnumTarjeta, pCVV, pMesVenc, pYearVenc) {


    if (pnumTarjeta == null || pnumTarjeta == undefined || pnumTarjeta == "") {
        inputNumTarjetaPago.classList.add("TError");
        MostrarError("El numero de tarjeta es requerido!");
        return false;
    }
    if (ValidarTipoTarjetaPago(pnumTarjeta) == true) {
        inputNumTarjetaPago.classList.remove("TError");
    } else {
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
        console.log("cvv " + pCVV);
        if (pCVV.length != cantCVV) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'CVV incorrecto',
            });
            return false;
        } else {
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
    if (Number(pYearVenc) == actualYear) {
        if (Number(pMesVenc) <= actualMonth) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tarjeta Vencida',

            });
            inputMesVencPago.classList.add("TError");
            inputYearVencPago.classList.add("TError");
            return false;

        } else if (Number(pYearVenc) < actualYear) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tarjeta Vencida',
            });
            inputMesVencPago.classList.add("TError");
            inputYearVencPago.classList.add("TError");
            return false;
        }
    } else {
        inputMesVencPago.classList.remove("TError");
        inputYearVencPago.classList.remove("TError");
    }
    return true;
}

function ValidarTipoTarjetaPago(pNumTarjeta) {
    let nTarjeta = pNumTarjeta;
    ///////visa////////
    if (nTarjeta.match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)) {
        tipoVisa.classList.remove("hidden");
        tipoMaster.classList.add("hidden");
        tipoAmex.classList.add("hidden");
        cantCVV = 3;
        return true;
        ///////mastercard/////////////    
    } else if (nTarjeta.match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)) {
        tipoVisa.classList.add("hidden");
        tipoMaster.classList.remove("hidden");
        tipoAmex.classList.add("hidden");
        cantCVV = 3;
        return true;
        ///////amex/////////////
    } else if (nTarjeta.match(/^3[4-7]\d{2}-?\d{6}-?\d{5}$/)) {
        tipoVisa.classList.add("hidden");
        tipoMaster.classList.add("hidden");
        tipoAmex.classList.remove("hidden");
        cantCVV = 4;
        return true;
    } else {
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
const overlay = document.querySelector('.overlay');
showPagarFact.addEventListener('click', function () {
    ShowModalPagoFactFunct();
});
const hiddenPagarFact = function () {
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
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalPago.classList.contains('hidden')) {
            hiddenPagarFact();
        }
    });
};

btnPagarFact.addEventListener('click', function () {
    PagarFactura();
})