'use strict';
let txtUsuarioLogueado2 = document.getElementById('TxtUsuarioLogueado2');
let txtNombreP = document.getElementById('txtNombreP');
let txtApellidosP = document.getElementById('txtApellidosP');
let txtCedulaP = document.getElementById('txtCedulaP');
let txtEmailP = document.getElementById('txtEmailP');
let txtUsuarioP = document.getElementById('txtUsuarioP');
let txtContraseniaP = document.getElementById('txtContraseniaP');
let txtDireccionP = document.getElementById('txtDireccionP');
// luis
const showPagar = document.getElementById('ver_metodo_pago');
const showPagar2 = document.getElementById('agregar_tarjeta12345');
const modalPago = document.querySelector('.form-pago-tarjeta12345');
const modalPago2 = document.querySelector('.form-pago-tarjeta2');
const closeModalPago = document.querySelector('.btn-cancerlar-tarjeta');
const closeModalPago2 = document.querySelector('.btn2-cancerlar-tarjeta');
const overlay1 = document.querySelector('.overlay1');
const overlay2 = document.querySelector('.overlay2');

const hiddenPagar = function() {
    modalPago.classList.add('hidden');
    overlay1.classList.add('hidden');
};

const hiddenPagar2 = function() {
    modalPago2.classList.add('hidden');
    overlay2.classList.add('hidden');
};

function ShowModalPagoFunct() {

    modalPago.classList.remove('hidden');
    overlay1.classList.remove('hidden');

    closeModalPago.addEventListener('click', hiddenPagar);
    overlay1.addEventListener('click', hiddenPagar);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalPago.classList.contains('hidden')) {
            hiddenPagar();
        }
    });
};

function ShowModalPagoFunct2() {

    modalPago2.classList.remove('hidden');
    overlay2.classList.remove('hidden');

    closeModalPago2.addEventListener('click', hiddenPagar2);
    overlay2.addEventListener('click', hiddenPagar2);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalPago2.classList.contains('hidden')) {
            hiddenPagar2();
        }
    });
};

showPagar.addEventListener('click', function() {
    ShowModalPagoFunct();
});

showPagar2.addEventListener('click', function() {
    hiddenPagar();
    ShowModalPagoFunct2();
});

window.addEventListener('load', () => {
    let usuario = GetSesion();
    console.log(usuario.Identificacion);
    txtUsuarioLogueado2.textContent = usuario.Nombre + ' ' + usuario.Apellido1;
    txtNombreP.textContent = usuario.Nombre;
    txtApellidosP.textContent = usuario.Apellido1 + " " + usuario.Apellido2;
    txtEmailP.textContent = usuario.Email;
    txtUsuarioP.textContent = usuario.Usuario;
    txtContraseniaP.textContent = "*********";
    txtDireccionP.textContent = usuario.Direccion;
    txtCedulaP.textContent = usuario.Identificacion;

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
        let celdaMascota = fila.insertCell();
        let celdaVeterinario = fila.insertCell();
        let celdaFecha = fila.insertCell();

        celdaMascota.innerHTML = cita.NombreMascota;
        celdaMascota.classList.add('h-citas');
        celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;
        celdaVeterinario.classList.add('h-citas');
        celdaFecha.innerHTML = cita.FechaHora;
        celdaFecha.classList.add('h-citas');
    };

};
