'use strict';
let userSessionT;
const showAgregarTajeta = document.querySelector('.btnAgregar-icon');
const modalAgregarTarjeta = document.querySelector('.form-pago-tarjeta');
const closeModalAgregarTarjeta = document.querySelector('.btn-cancerlar-tarjeta');
const overlay = document.querySelector('.overlay');
const cerrarModalIcon = document.querySelector('.cerrarModalX-tarjeta');
//let cantidadT = document.getElementsByClassName('fa-trash-can');



let btnAgregarTarjeta = document.getElementById('btnAgregarTarjeta');
let listaTarjetas = [];
userSessionT = GetSesion();


async function getListaTarjetas() {
    let result = await buscaUsuarioID(userSessionT.Identificacion);
    if (result != {} && result.resultado == true) {
        //console.log(result.usuarioDB.Tarjetas);
        listaTarjetas = result.usuarioDB.Tarjetas;
    }
    return listaTarjetas;
}

window.addEventListener("load", () => {
    //////////////////// cargar datos desde BD////////////////////
    mostrarTarjetas(listaTarjetas);
});


async function mostrarTarjetas(pListaTarjetas) {
    pListaTarjetas = await getListaTarjetas();
    for (let i = 0; i < pListaTarjetas.length; i++) {
        console.log(pListaTarjetas[i]);
        let cajaTarjetas = document.querySelector('.caja-metodos-pago');
        let tarjetaNum = document.createElement('div');
        let createP = document.createElement('p');
        let divLogoTarjeta = document.createElement('div');
        let imgTarjeta = document.createElement('i');
        const iconDelete = document.createElement('i');
        const createDiv = document.createElement('div');
        cajaTarjetas.appendChild(createDiv);
        createDiv.classList.add('cajaTarjeta');
        createDiv.appendChild(iconDelete);
        iconDelete.classList.add('fa-solid');
        iconDelete.classList.add('fa-trash-can');
        iconDelete.style = 'color: #cc2900;';
        iconDelete.addEventListener('click', async function () {
            let tarjetasUsuario = await getListaTarjetas();
            let confirmacion = false;
            await Swal.fire({
                title: '¿Desea eliminar el registro de la tarjeta de numero: ' + tarjetasUsuario[i].NumeroTarjeta + '?',
                showDenyButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: 'Cancelar',
                icon: 'warning'
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
                let result = await EliminarTarjeta(userSessionT._id, tarjetasUsuario[i]._id);
                if (result != {} && result.resultado) {
                    ConfirmarDatos(result.msj);
                    setTimeout(function () {
                        location.href = "./MetodosPago.html";
                    }, 2000);
                } else {
                    MostrarError(result.msj);
                };
                // await GetListaPersonas();
            }
        })
        createDiv.appendChild(tarjetaNum);
        tarjetaNum.classList.add('tarjeta-por-agregar');
        tarjetaNum.appendChild(createP);
        createP.classList.add('numero-tajeta');
        tarjetaNum.appendChild(divLogoTarjeta);
        divLogoTarjeta.classList.add('logo-tarjeta');
        divLogoTarjeta.appendChild(imgTarjeta);
        imgTarjeta.classList.add('fa-brands');
        imgTarjeta.classList.add('fa-cc-visa');
        imgTarjeta.classList.add('fa-3x');

        createP.textContent = pListaTarjetas[i].NumeroTarjeta;
        createP.setAttribute('id', pListaTarjetas[i]._id);

    }
}

function disableScroll() {
    window.scrollTo(0, 0);
}


const limpiarFormAgregar = function () {
    modalAgregarTarjeta.reset();
}

const hiddenAgregar = function () {
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
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalAgregarTarjeta.classList.contains('hidden')) {
            hiddenAgregar();
        }
    });
};

showAgregarTajeta.addEventListener('click', function () {
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

// Campo numeros
var numeros = document.getElementById('numTarjeta');

// Poner cursor en el campo numeros
numeros.focus();

numeros.onkeydown = function(e){
	// Permitir la tecla para borrar
	if (e.key == 'Backspace') return true;

	// Permitir flecha izquierda
	if (e.key == 'ArrowLeft') return true;

	// Permitir flecha derecha
	if (e.key == 'ArrowRight') return true;

	// Bloquear tecla de espacio
	if (e.key == ' ') return false;

	// Bloquear tecla si no es un numero
	if (isNaN(e.key)) return false;
};

numeros.onkeyup = function(){
	numeros.value = numeros.value
					// Borrar todos los espacios
					.replace(/\s/g, '')

					// Agregar un espacio cada dos numeros
					.replace(/([0-9]{4})/g, '$1 ')

					// Borrar espacio al final
					.trim();
};

    




async function registarTarjeta() {
    if (ValidarDatostarjeta() == true) {
        let result = await RegistrarTarjetaNueva(userSessionT._id, inputNombreTitular.value, inputNumTarjeta.value, inputMesVenc.value, inputYearVenc.value, inputNumCVV.value);
        if (result.resultado == true) {
            ConfirmarDatos("Tarjeta registrada con éxito!");
            hiddenAgregar();
            setTimeout(function () {
                location.href = "./MetodosPago.html";
            }, 2000);
        }

    }
}

btnAgregarTarjeta.addEventListener("click", () => {
    registarTarjeta();
});



function ValidarDatostarjeta() {
    let sNombreTitular = inputNombreTitular.value;
    let sNumTarjeta = inputNumTarjeta.value;
    let sNumCVV = inputNumCVV.value;
    let nMesV = inputMesVenc.value;
    let nYearV = inputYearVenc.value;

    if (sNombreTitular == null || sNombreTitular == undefined || sNombreTitular == "") {
        inputNombreTitular.classList.add("TError");
        MostrarError("El nombre es requerido!");
        return false;
    }
    if (sNombreTitular.match(/^[a-zA-Z,.' -]+$/)) {
        inputNombreTitular.classList.remove("TError");
    } else {
        inputNombreTitular.classList.add("TError");
        MostrarError("¡El nombre de titular de la tarjeta no puede contener caracteres especiales ni números!");
        return false;
    }
    if (sNumTarjeta == null || sNumTarjeta == undefined || sNumTarjeta == "") {
        inputNumTarjeta.classList.add("TError");
        MostrarError("El número de tarjeta es requerido!");
        return false;
    }
    if (ValidarTipoTarjeta() == true) {
        inputNumTarjeta.classList.remove("TError");
    } else {
        return false;
    }
    if (sNumCVV == null || sNumCVV == undefined || sNumCVV == "") {
        inputNumCVV.classList.add("TError");
        MostrarError("El código de seguridad es requerido!");
        return false;
    } else {
        console.log("cvv " + sNumCVV);
        if (sNumCVV.length != cantCVV) {
            inputNumCVV.classList.add("TError");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡CVV incorrecto!',
            });
            return false;
        } else {
            inputNumCVV.classList.remove("TError");
        }

    }
    if (nMesV == null || nMesV == undefined || nMesV == "") {
        inputMesVenc.classList.add("TError");
        MostrarError("El mes de vencimiento es requerido!");
        return false;
    } else {
        inputMesVenc.classList.remove("TError");
    }
    if (nYearV == null || nYearV == undefined || nYearV == "") {
        inputYearVenc.classList.add("TError");
        MostrarError("El año de vencimiento es requerido!");
        return false;
    } else {
        inputYearVenc.classList.remove("TError");
    }
    if (Number(nYearV) == actualYear) {
        if (Number(nMesV) <= actualMonth) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Tarjeta vencida!',

            });
            inputMesVenc.classList.add("TError");
            inputYearVenc.classList.add("TError");
            return false;

        } else if (Number(nYearV) < actualYear) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Tarjeta vencida!',
            });
            inputMesVenc.classList.add("TError");
            inputYearVenc.classList.add("TError");
            return false;
        }
    } else {
        inputMesVenc.classList.remove("TError");
        inputYearVenc.classList.remove("TError");
    }
    return true;
}

function ValidarTipoTarjeta() {
    let nTarjeta = inputNumTarjeta.value;
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