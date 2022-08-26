'use strict';

let userSessionC;
let listaMascotas = [];
let listaUsuarios = [];
let listaCitas = [];

let botonFiltrar = document.getElementById('btnFiltroCita');
let fechaInicio = document.getElementById('DateFecha1');
let fechaFinal = document.getElementById('DateFecha2');

window.addEventListener('load', () =>{
    userSessionC = GetSesion();
    GetListaCitas();
    GetlistaMascota();
});


async function GetListaCitas() {

    let result = await getCitasArray();

    if (result != {} && result.resultado == true) {
        ImprimirListaCitas(result.ListaCitasBD);
    }
}

async function GetlistaMascota() {

    let result = await getMascotasArray(userSessionC.Identificacion);
    if (result != {} && result.resultado == true) {
        listaMascotas = result.MascotasDB;
    
    }
}

async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
        listaUsuarios = result.ListaUsuariosBD;
    }
}


function ImprimirListaCitas(ListaCitasBD) {

    let tThead = document.getElementById('tTheadRCitas');
    let tbody = document.getElementById('tBodyRCitas');

    tbody.innerHTML = '';
    tThead.innerHTML = '';


    // thead
    let thRow = tThead.insertRow();

    let celNumCita = thRow.insertCell();
    celNumCita.innerHTML = 'Num. Cita';

    // let celPropietario= thRow.insertCell();
    // celPropietario.innerHTML = 'Propietario';

    let celMascota = thRow.insertCell();
    celMascota.innerHTML = 'Mascota';

    // let celVeterinario = thRow.insertCell();
    // celVeterinario.innerHTML = 'Veterinario';

    let celFecha = thRow.insertCell();
    celFecha.innerHTML = 'Fecha';

    let celEstado = thRow.insertCell();
    celEstado.innerHTML = 'Estado';

    let celAcciones = thRow.insertCell();
    celAcciones.innerHTML = 'Acciones';


    ///////////citas Usuario/////////////////
    for (let i = 0; i < ListaCitasBD.length; i++) {

        if(userSessionC.Rol == 2){
            if (ListaCitasBD[i].IdentificacionUsuario == userSessionC.Identificacion) {
                listaCitas.push(ListaCitasBD[i]);
            }
        }else if(userSessionC.Rol == 3){
            if (ListaCitasBD[i].
                IdentificacionVeterinario == userSessionC.Identificacion) {
                listaCitas.push(ListaCitasBD[i]);
            }
        }else{
            listaCitas = ListaCitasBD;
        }
    }

    function compare_numCita(a, b) {
        if (a.celNumCita < b.celNumCita) {
            return -1;
        }
        if (a.celNumCita > b.celNumCita) {
            return 1;
        }
        return 0;
    }


    listaCitas.sort(compare_numCita);
    listaCitas.reverse()



    for (let i = 0; i < listaCitas.length; i++) {


        let cita = listaCitas[i];

        // let veterinario = buscaUsuarioID(cita.IdentificacionVeterinario);
        // let propietario = buscaUsuarioID(cita.IdentificacionUsurio) ;

        let fila = tbody.insertRow();

        let celdaNumCita = fila.insertCell();
        celdaNumCita.innerHTML = cita.NumeroCita;

        // let celdaPropietario = fila.insertCell();
        // celdaPropietario.innerHTML = propietario.Nombre + ' ' + propietario.Apellido1 + ' ' + propietario.Apellido2;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = cita.NombreMascota;

        // let celdaVeterinario = fila.insertCell();
        // celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;

        let celdaFecha = fila.insertCell();
        celdaFecha.innerHTML = cita.Fecha;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = cita.Estado;
        celdaEstado.classList.add('Estado');

        let celdaBoton = fila.insertCell();



        let EstadoCitaif = document.querySelectorAll('.Estado');
        if (EstadoCitaif[i].innerHTML == 'AGENDADA') {
            if (userSessionC.Rol === 2) {
                let BotonV = document.createElement('a');
                BotonV.setAttribute('href', '/public/VerCitaDatos.html?_id=' + cita._id + '&rol=' + userSessionC.Rol);
                let iconoV = document.createElement('i');
                iconoV.classList.add("fa-solid")
                iconoV.classList.add("fa-eye")
                iconoV.classList.add("btnV")
                BotonV.appendChild(iconoV);
                celdaBoton.appendChild(BotonV);
            }



            if (userSessionC.Rol !== 2) {
                let Boton = document.createElement('a');
                Boton.setAttribute('href', '/public/VerCitaDatos.html?_id=' + cita._id + '&rol=' + userSessionC.Rol);
                let icono = document.createElement('i');
                icono.classList.add("fa-solid")
                icono.classList.add("fa-pen-to-square")
                icono.classList.add("btnEd")
                Boton.appendChild(icono);
                celdaBoton.appendChild(Boton);
            }





        } else {
            let BotonV = document.createElement('a');
            BotonV.setAttribute('href', '/public/VerCitaDatos.html?_id=' + cita._id + '&rol=' + userSessionC.Rol);
            let iconoV = document.createElement('i');
            iconoV.classList.add("fa-solid")
            iconoV.classList.add("fa-eye")
            iconoV.classList.add("btnV")
            BotonV.appendChild(iconoV);
            celdaBoton.appendChild(BotonV);
        }


    }
    let EstadoCita = document.querySelectorAll('.Estado');
    VerEstado(EstadoCita);
}

function VerEstado(EstadoCita) {

    for (let i = 0; i < EstadoCita.length; i++) {
        let sEstadoCita = EstadoCita[i].innerHTML;
        if (sEstadoCita == 'AGENDADA') {
            EstadoCita[i].classList.add("AGENDADA")

        }
        if (sEstadoCita == 'CANCELADA') {
            EstadoCita[i].classList.add("CANCELADA")

        }
        if (sEstadoCita == 'FINALIZADA') {
            EstadoCita[i].classList.add("FINALIZADA")


        }
    }
}
    
