'use strict';
let txtUsuarioLogueado2 = document.getElementById('TxtUsuarioLogueado2');
let txtNombreP = document.getElementById('txtNombreP');
let txtApellidosP = document.getElementById('txtApellidosP');
let txtCedulaP = document.getElementById('txtCedulaP');
let txtEmailP = document.getElementById('txtEmailP');
let txtUsuarioP = document.getElementById('txtUsuarioP');
let txtContraseniaP = document.getElementById('txtContraseniaP');
let txtDireccionP = document.getElementById('txtDireccionP');

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