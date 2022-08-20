'use strict'



let listaMascotas = [];
let listaUsuarios = [];
let userSessionC;
let listaCitas = [];

let botonFiltrar = document.getElementById('btnFiltroCita');
let fechaInicio = document.getElementById('DateFecha1');
let fechaFinal = document.getElementById('DateFecha2');

window.addEventListener('load', () => {
    userSessionC = GetSesion();
    GetListaCitas();
    GetlistaMascota();
    GetlistaUsuarios();
});


botonFiltrar.addEventListener('click', () => {
    FiltarListaCitas(fechaInicio.value, fechaFinal.value);
});

async function GetListaCitas() {

    let result = await getCitasArray();

    if (result != {} && result.resultado == true) {
        ImprimirListaCitas(result.ListaCitasBD);
    }
}

async function FiltarListaCitas(pFecha1, pFecha2) {
    let result = await FiltrarCitas(pFecha1, pFecha2);

    if (result != {} && result.resultado == true) {
        ImprimirListaCitas(result.ListaCitasBD);
    }
}


async function GetlistaMascota() {

    let result = await getMascotasArray(userSessionC.Identificacion);
    if (result != {} && result.resultado == true) {
        listaMascotas = result.MascotasDB;
        ImprimirListaMascotasCita(userSessionC.Identificacion, listaMascotas);
    }
}

async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
        listaUsuarios = result.ListaUsuariosBD;
        ImprimirListaVeterinarios(listaUsuarios);

    }
}

function ImprimirListaCitas(ListaCitasBD) {

    let tThead = document.getElementById('tTheadCitas');
    let tbody = document.getElementById('tBodyCitas');

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
        celdaFecha.innerHTML = cita.FechaHora;

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


            let BotonC = document.createElement('a');
            BotonC.setAttribute('id', (cita.NumeroCita));
            BotonC.setAttribute('onclick', 'ShowModalCancelFunct(id)');
            let iconoC = document.createElement('i');
            iconoC.classList.add("fa-solid")
            iconoC.classList.add("fa-circle-xmark")
            iconoC.classList.add("btnCa")
            BotonC.appendChild(iconoC);
            celdaBoton.appendChild(BotonC);


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

function AsignarNombreOtro() {
    let sIdentificacion = inputNombreMascota.options[inputNombreMascota.selectedIndex].text
    let divNombreOtro = document.getElementById('NombreOtro');

    if (sIdentificacion == 'Otro') {
        divNombreOtro.classList.remove("hidden")
        console.log(listaUsuarios.length)

    } else {
        divNombreOtro.classList.add("hidden")
    }
}

function limpiarFormCita() {
    document.getElementById('formCrearCita').reset();
}


let inputNombreMascota = document.querySelector('#selectMascotaCita');
let sIdentificacion = inputNombreMascota.options[inputNombreMascota.selectedIndex].text

let inputFecha = document.getElementById('txtFecha');
let inputTipoIdentificacion = document.querySelector('#selectVeterinario');
let NombreMascotaOtro = document.getElementById('txtNombreOtro');

let inputDireccion = document.getElementById('txtDireccion');

let btnCrear = document.getElementById('btnIniciar');
btnCrear.addEventListener('click', CrearCita);


async function CrearCita() {

    if (ValidarDatosCita() == true) {

        let IdentificacionUsuario = userSessionC.Identificacion;
        let IdMascota = "N/D";
        let IdentificacionVeterinario;
        let NombreMascota = inputNombreMascota.options[inputNombreMascota.selectedIndex].text
        console.log("for " + NombreMascota)
        for (let i = 0; i < listaMascotas.length; i++) {
            if (IdentificacionUsuario == listaMascotas[i].IdentificacionDuenio && NombreMascota == listaMascotas[i].NombreMascota) {



                IdMascota = listaMascotas[i]._id;


            } else if (NombreMascota === "Otro") {

                NombreMascota = "(Otro) " + NombreMascotaOtro.value;
            }
        }
        let NombreVeterinario = inputTipoIdentificacion.options[inputTipoIdentificacion.selectedIndex].text
        console.log(NombreVeterinario)
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (NombreVeterinario == listaUsuarios[i].Nombre) {
                IdentificacionVeterinario = listaUsuarios[i].Identificacion;
                
            }else if(NombreVeterinario === ("Aleatorio")){
                let listaVeterinarios = [];
                for (let i = 0; i < listaUsuarios.length; i++) {
                    if(listaUsuarios[i].Rol == 3){
                        listaVeterinarios.push(listaUsuarios[i])
                        
                    }
                    console.log(listaVeterinarios)
                }

                var num = Math.floor(Math.random()*(listaVeterinarios.length));
                console.log(num)
                NombreVeterinario=listaVeterinarios[num].Nombre;
            }
        }

        let FechaHora = inputFecha.value;
        let ObservacionesCita = inputDireccion.value; 
        let result = await crearCita(IdentificacionUsuario,IdMascota,NombreMascota,FechaHora,IdentificacionVeterinario,ObservacionesCita);
        if (result != {} && result.data.resultado == true) {
            ConfirmarDatos(result.data.msj);
            setTimeout(() => {
                limpiarFormCita();
                hiddenCrearModal();
                location.href="./AppVerCitas.html"                
            }, 2000);
        }else{
            MostrarError(result.data.msj)
        }
    }
}

function ValidarDatosCita() {

    let sNombreMascota = inputNombreMascota.value;
    let dFecha = inputFecha.value;
    let sIdentificacion = inputTipoIdentificacion.value;
    let sDireccion = inputDireccion.value;


    if (sNombreMascota == null || sNombreMascota == undefined || sNombreMascota == "") {


        inputNombreMascota.classList.add("error")
        MostrarErrorC();
        return false;
    } else {
        inputNombreMascota.classList.remove("error")
    }

    if (dFecha == null || dFecha == undefined || dFecha == "") {
        inputFecha.classList.add("error")
        MostrarErrorC();
        return false;
    } else {
        inputFecha.classList.remove("error")
    }
    if (new Date() > new Date(dFecha) == true) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'la fecha no pueder ser menor al dia de hoy!',
        })
        inputFecha.classList.add("error")
        return false;
    }

    if (sIdentificacion == null || sIdentificacion == undefined || sIdentificacion == "") {
        inputTipoIdentificacion.classList.add("error")
        MostrarErrorC();
        return false;
    } else {
        inputTipoIdentificacion.classList.remove("error")
    }

    if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
        inputDireccion.classList.add("error")
        MostrarErrorC();
        return false;
    } else {
        inputDireccion.classList.remove("error")
    }
    return true;
}

function MostrarErrorC() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Dato Requerido!',
    })
}

function ConfirmarDatosC() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cita Asignada',
        showConfirmButton: false,
        timer: 1500
    })
}


//carga Mascotas
async function ImprimirListaMascotasCita(user, listaMascotas) {
    let Select = document.getElementById('selectMascotaCita');
    let idCliente = user
    let opcion;
    let valor = 0;


    for (let i = 0; i < listaMascotas.length; i++) {
        if (idCliente == listaMascotas[i].IdentificacionDuenio) {
            opcion = document.createElement('option');
            valor += 1;
            opcion.value = valor;
            opcion.text = listaMascotas[i].NombreMascota;
            Select.appendChild(opcion);
        }
    }
    opcion = document.createElement('option');
    opcion.value = ++valor;
    opcion.text = 'Otro';
    Select.appendChild(opcion);
}

//carga Veterinarios
function ImprimirListaVeterinarios(listaUsers) {
    let Select = document.getElementById('selectVeterinario');
    let opcion;
    let valor = 0;


    for (let i = 0; i < listaUsers.length; i++) {

        if (listaUsers[i].Rol == 3) {
            opcion = document.createElement('option');
            valor += 1;
            opcion.value = valor;
            opcion.text = listaUsers[i].Nombre;
            Select.appendChild(opcion);
        }


    }
    opcion = document.createElement('option');
    opcion.value = ++valor;
    opcion.text = 'Aleatorio';
    Select.appendChild(opcion);
}




///MODAL CANCELAR CITA///

function disableScroll() {
    window.scrollTo(0, 0);
}

//Cancelar Cita
const modalCancelarCita = document.querySelector('#formCancelarCita');
const overlayCancelar = document.querySelector('.overlay');
const closeCancelarCita = document.querySelector('#cerrarCancelarC');


const hiddenCancelModal = function () {
    modalCancelarCita.classList.add("hidden");
    overlayCancelar.classList.add("hidden");
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalCancelFunct(id) {
    llenarModalCancelarCita(id);
    modalCancelarCita.classList.remove("hidden");
    overlayCancelar.classList.remove("hidden");
    location.href = "#top-page";
    window.addEventListener("scroll", disableScroll);

    closeCancelarCita.addEventListener('click', hiddenCancelModal);
    overlayCancelar.addEventListener('click', hiddenCancelModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalCancelarCita.classList.contains('hidden')) {
            hiddenCancelModal();
        }
    });
};

// FIN MODAL CANCELAR CITA
let outNumCita = document.getElementById('numCitaCancelar')
let inputCancelar = document.getElementById('motivoCancelar');

async function CancelarCitas() {

    let numCita = outNumCita.value;
    let sMotivoCancelar = inputCancelar.value;
    let sEstado = "CANCELADA";


    if (sMotivoCancelar == null || sMotivoCancelar == undefined || sMotivoCancelar == "") {
        inputCancelar.classList.add("error")
        MostrarError('Debe ingresar motivo de cancelación');
        return false;
    } else {
        inputCancelar.classList.remove("error")

        let result = await CancelarCita(numCita, sEstado, sMotivoCancelar);

        if (result != {} && result.data.resultado == true) {
            ConfirmarDatos(result.data.msj);
            setTimeout(() => {
                hiddenCancelModal();
                location.href = "./AppVerCitas.html"
            }, 2000);
        } else {
            MostrarError(result.data.msj);
            return
        }
    }
}


//MODAL CREAR CITA

const modalCrearCita = document.querySelector('#formCrearCita');
const overlay = document.querySelector('.overlay');
const closeCrearCita = document.querySelector('#cerrarModalCita');
const showCrearCita = document.getElementById('showCrearCita');
const closeCrearCita2 = document.querySelector('#cerrarCrearC');


const hiddenCrearModal = function () {
    modalCrearCita.classList.add("hidden");
    overlay.classList.add("hidden");
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalCrearFunct() {
    modalCrearCita.classList.remove("hidden");
    overlay.classList.remove("hidden");
    location.href = "#top-page";
    window.addEventListener("scroll", disableScroll);

    closeCrearCita.addEventListener('click', hiddenCrearModal);
    closeCrearCita2.addEventListener('click', hiddenCrearModal);
    overlayCancelar.addEventListener('click', hiddenCrearModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalCrearCita.classList.contains('hidden')) {
            hiddenCrearModal();
        }
    });
};

showCrearCita.addEventListener('click', ShowModalCrearFunct);

// FIN MODAL CREAR CITA
function llenarModalCancelarCita(id) {

    for (let i = 0; i < listaCitas.length; i++) {
        if (listaCitas[i].NumeroCita == id) {
            document.getElementById('numCitaCancelar').value = id;
            document.getElementById('nombreCitaCancelar').value = listaCitas[i].
            NombreMascota;
        }

    }
}

function MostrarError(txtInfo) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: txtInfo,
    })
}

function ConfirmarDatos(txtInfo) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: txtInfo,
        showConfirmButton: false,
        timer: 1500
    })
}