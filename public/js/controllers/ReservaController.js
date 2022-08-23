'use strict';

let userSessionR;
let listaUsuarios = [];
let listaMascotas = [];
let listaReservas = [];
window.addEventListener('load', () => {
    userSessionR = GetSesion();
    GetListaReservas();
    GetlistaUsuarios();
    if (userSessionR.Rol == 2) {
        GetlistaMascota();
    }
    registrarReservaUser()
});


async function GetListaReservas() {

    let result = await getReservasArray();
    if (result != {} && result.resultado == true) {

        ImprimirListaReservas(result.ListaReservasBD)

    }
}

async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
        listaUsuarios = result.ListaUsuariosBD;
    }
}


function ImprimirListaReservas(ListaReservasBD) {

    let tThead = document.getElementById('tTheadReservas');
    let tbody = document.getElementById('tBodyReservas');


    tbody.innerHTML = '';
    tThead.innerHTML = '';

    // thead
    let thRow = tThead.insertRow();

    let celNumCita = thRow.insertCell();
    celNumCita.innerHTML = 'Num. Reserva';

    // let celPropietario = thRow.insertCell();
    // celPropietario.innerHTML = 'Propietario';

    let celMascota = thRow.insertCell();
    celMascota.innerHTML = 'Mascota';

    let celFechaEnt = thRow.insertCell();
    celFechaEnt.innerHTML = 'Fecha entrada';

    let celFechaSal = thRow.insertCell();
    celFechaSal.innerHTML = 'Fecha salida';

    let celEstado = thRow.insertCell();
    celEstado.innerHTML = 'Estado';

    let celAcciones = thRow.insertCell();
    celAcciones.innerHTML = 'Acciones';


    ///////////citas Usuario/////////////////

    for (let i = 0; i < ListaReservasBD.length; i++) {
        if(userSessionR.Rol == 2){
            if (ListaReservasBD[i].IdentificacionUsuario == userSessionR.Identificacion) {
                listaReservas.push(ListaReservasBD[i]);
            }
        }else if(userSessionR.Rol == 3){
            if (ListaReservasBD[i].
                IdentificacionVeterinario == userSessionR.Identificacion) {
                    listaReservas.push(ListaReservasBD[i]);
            }
        }else{
            listaReservas = ListaReservasBD;
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

    listaReservas.sort(compare_numCita);
    listaReservas.reverse()


    for (let i = 0; i < listaReservas.length; i++) {


        let reserva = listaReservas[i];

        let fila = tbody.insertRow();

        let celdaNumReserva = fila.insertCell();
        celdaNumReserva.innerHTML = reserva.NumeroReservacion;


        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = reserva.NombreMascota;

        let celdafechaEnt = fila.insertCell();
        celdafechaEnt.innerHTML = reserva.FechaHoraIngreso;

        let celdaFechaSalida = fila.insertCell();
        celdaFechaSalida.innerHTML = reserva.FechaHoraSalida;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = reserva.Estado;
        celdaEstado.classList.add('Estado');

        let celdaBoton = fila.insertCell();

        let EstadoCitaif = document.querySelectorAll('.Estado');

        if (EstadoCitaif[i].innerHTML == 'AGENDADA') {
            if (userSessionR.Rol === 2) {
                let BotonV = document.createElement('a');
                BotonV.setAttribute('href', '/public/VerReservacionDatos.html?_id=' + reserva._id + '&rol=' + userSessionR.Rol);
                let iconoV = document.createElement('i');
                iconoV.classList.add("fa-solid")
                iconoV.classList.add("fa-eye")
                iconoV.classList.add("btnV")
                BotonV.appendChild(iconoV);
                celdaBoton.appendChild(BotonV);
            }


            if (userSessionR.Rol !== 2) {
                let Boton = document.createElement('a');
                Boton.setAttribute('href', '/public/VerReservacionDatos.html?_id=' + reserva._id + '&rol=' + userSessionR.Rol);
                let icono = document.createElement('i');
                icono.classList.add("fa-solid")
                icono.classList.add("fa-pen-to-square")
                icono.classList.add("btnEd")
                Boton.appendChild(icono);
                celdaBoton.appendChild(Boton);
            }

            let BotonC = document.createElement('a');
            BotonC.setAttribute('id', (reserva.NumeroReservacion));
            BotonC.setAttribute('onclick', 'ShowModalCancelReservaFunct(id)');
            let iconoC = document.createElement('i');
            iconoC.classList.add("fa-solid")
            iconoC.classList.add("fa-circle-xmark")
            iconoC.classList.add("btnCa")
            BotonC.appendChild(iconoC);
            celdaBoton.appendChild(BotonC);

        } else {
            let BotonV = document.createElement('a');
            BotonV.setAttribute('href', '/public/VerReservacionDatos.html?_id=' + reserva._id + '&rol=' + userSessionR.Rol);
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

async function GetlistaMascota() {

    let result = await getMascotasArray(userSessionR.Identificacion);
    if (result != {} && result.resultado == true) {
        listaMascotas = result.MascotasDB;
        ImprimirListaMascotasReserva(userSessionR.Identificacion, listaMascotas);
    }
}
async function GetlistaMascotaUser(pIdUser) {

    let result = await getMascotasArray(pIdUser);
    if (result != {} && result.resultado == true) {
        listaMascotas = result.MascotasDB;
        ImprimirListaMascotasReserva(pIdUser, listaMascotas);
    }
}
let idUser = document.getElementById("IdCliente");
let inputNombreMascotaReserva = document.querySelector('#selectMacota');
let inputEntrada = document.getElementById('dateCheckIn');
let inputSalida = document.getElementById('dateCheckOut');
let inputCuidadosReserva = document.getElementById('txtCuidadosEsp');
let IdentificacionUsuario;
let btnCrearReserva = document.getElementById('btnReserva');
btnCrearReserva.addEventListener('click', CrearReserva);


async function CrearReserva() {
    if (ValidarDatos() == true) {

        if (userSessionR.Rol == 2) {
            IdentificacionUsuario = userSessionR.Identificacion;
        } else {
            IdentificacionUsuario = idUser.value;
        }
        let NombreMascota = inputNombreMascotaReserva.options[inputNombreMascotaReserva.selectedIndex].text;
        let IdMascota;
        for (let i = 0; i < listaMascotas.length; i++) {
            if (IdentificacionUsuario == listaMascotas[i].IdentificacionDuenio && NombreMascota == listaMascotas[i].NombreMascota) {
                IdMascota = listaMascotas[i]._id;
            }

        }
        let dFechaE = inputEntrada.value;
        let dFechaS = inputSalida.value;
        let sCiuidadosEsp = inputCuidadosReserva.value;
        let result = await crearReserva(IdentificacionUsuario, IdMascota, NombreMascota, dFechaE, dFechaS, sCiuidadosEsp)
        if (result != {} && result.data.resultado) {
            ConfirmarDatos(result.data.msj);
            setTimeout(() => {
                limpiarFormReserva();
                hiddenCrearModal();
                location.href = "./AppVerReservas.html"
            }, 2000);
        }else{
            ConfirmarDatos(result.data.msj);
        }
    }
}


function ValidarDatos() {
    let sNombreMascota = inputNombreMascotaReserva.value;
    let dFechaEnt = inputEntrada.value;
    let dFechaSalida = inputSalida.value;
    let sDireccion = inputCuidadosReserva.value;

    if (userSessionR.Rol != 2) {
        let sIdUser = idUser.value;
        let isnum = /^\d+$/.test(sIdUser);

        if (sIdUser == null || sIdUser == undefined || sIdUser == "") {
            idUser.classList.add("error")
            MostrarError("¡La identificación es requerida!");
            return false;
        }
        if (isnum == false) {
            idUser.classList.add("error")
            MostrarError("¡La identificación debe contener solo números! No puede contener caracteres especiales como guiones.");
            return false;
        }

        if (sIdUser.length < 9 || sIdUser.length > 12) {
            idUser.classList.add("error")
            MostrarError("¡La cedula persona física debe tener 9 números, cedula persona jurídica 10 números, NITE 10 números y la DIMEX 11 o 12 números! Todas sin cero al inicio ni guiones.");
            return false;
        }
        else {
            idUser.classList.remove("error")
        }
    }
    if (sNombreMascota == null || sNombreMascota == undefined || sNombreMascota == "") {
        inputNombreMascotaReserva.classList.add("error")
        MostrarError("El nombre de la mascota es requerido!");
        return false;
    } else {
        inputNombreMascotaReserva.classList.remove("error")
    }

    if (dFechaEnt == null || dFechaEnt == undefined || dFechaEnt == "") {
        inputEntrada.classList.add("error")
        MostrarError("La fecha de entrada es requerida!");
        return false;
    } else {
        inputEntrada.classList.remove("error")

    }
    if (new Date() > new Date(dFechaEnt) == true) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'la fecha no pueder ser menor al dia de hoy!',
        })
        inputFecha.classList.add("error")
        return false;
    }
    //fecha sumada
    var res = new Date();
    res.setDate(res.getDate() + 15);
    if (res < new Date(dFechaEnt) == true) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pueden hacer reservas con mas de 15 días de anticipación!',
        })
        inputFecha.classList.add("error")
        return false;
    }

    if (dFechaSalida == null || dFechaSalida == undefined || dFechaSalida == "") {
        inputSalida.classList.add("error")
        MostrarError("La fecha de salida es requerida!");
        return false;
    } else {
        inputSalida.classList.remove("error")
    }

    if (new Date(dFechaEnt) > new Date(dFechaSalida)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La fecha de salida no puede ser menor a la de entrada',
        })
        inputSalida.classList.add("error")
        return false;
    }

    if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
        inputCuidadosReserva.classList.add("error")
        MostrarError("La dirección es requerida!");
        return false;
    } else {
        inputCuidadosReserva.classList.remove("error")
    }
    return true;
}

// function MostrarError() {
//     Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Dato Requerido!',
//     })
// }

// function ConfirmarDatos() {
//     Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Reserva Asignada',
//         showConfirmButton: false,
//         timer: 1500
//     })
// }

//carga Mascotas
function ImprimirListaMascotasReserva(user, listaMascotas) {
    let Select = document.getElementById('selectMacota');
    let idCliente = user;
    let opcion;
    let valor;


    for (let i = 0; i < listaMascotas.length; i++) {

        if (idCliente == listaMascotas[i].IdentificacionDuenio) {
            opcion = document.createElement('option');
            valor = (i + 1);
            opcion.value = valor;
            opcion.text = listaMascotas[i].NombreMascota;;
            Select.appendChild(opcion);
        }
    }
}

//////////////registrar reservas secretaria/////////////////
let divIdUser = document.getElementById('UsuarioReserva')




function registrarReservaUser() {

    if (userSessionR.Rol == 2) {
        divIdUser.classList.add("hidden")
    } else {
        divIdUser.classList.remove("hidden")
    }
}

function validarUser(){

    let sIdUser = idUser.value;
  
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (sIdUser == listaUsuarios[i].Identificacion) {
            GetlistaMascotaUser(sIdUser);
            i = listaUsuarios.length;
        }else{
            if (i == listaUsuarios.length-1) {
                MostrarError("El usuario no existe, intente de nuevo.")
            }
        }
        
    }
}









function limpiarFormReserva() {
    document.getElementById('formCrearReserva').reset();
}


function disableScroll() {
    window.scrollTo(0, 0);
}

// MODAL CANCELAR RESERVA

//Cancelar Reserva
const modalCancelarReserva = document.querySelector('#formCancelarReserva');
const overlayCancelarReserva = document.querySelector('.overlay');
const closeCancelarReserva = document.querySelector('#cerrarCancelarR');


// start function show modal
const hiddenCancelModalReserva = function () {
    modalCancelarReserva.classList.add('hidden');
    overlayCancelarReserva.classList.add('hidden');
    window.removeEventListener("scroll", disableScroll);

};


function ShowModalCancelReservaFunct(id) {
    llenarModalCancelarReserva(id);
    modalCancelarReserva.classList.remove('hidden');
    overlayCancelarReserva.classList.remove('hidden');
    location.href = '#top-page';
    window.addEventListener("scroll", disableScroll);

    closeCancelarReserva.addEventListener('click', hiddenCancelModalReserva);
    overlayCancelarReserva.addEventListener('click', hiddenCancelModalReserva);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalCancelarReserva.classList.contains('hidden')) {
            hiddenCancelModalReserva();
        }
    });
};

// FIN MODAL CANCELAR RESERVA

let outNumReserva = document.getElementById('numReservaCancelar')
let inputCancelar = document.getElementById('motivoCancelar');
async function CancelarReserva() {

    let numReserva = outNumReserva.value;
    let sMotivoCancelar = inputCancelar.value;
    let sEstado = "CANCELADA";


    if (sMotivoCancelar == null || sMotivoCancelar == undefined || sMotivoCancelar == "") {
        inputCancelar.classList.add("error")
        MostrarError('Debe ingresar motivo de cancelación');
        return false;
    } else {
        inputCancelar.classList.remove("error")

        let result = await CancelarReservacion(numReserva, sEstado, sMotivoCancelar);

        if (result != {} && result.data.resultado == true) {
            ConfirmarDatos(result.data.msj);
            setTimeout(() => {
                hiddenCancelModalReserva();
                location.href = "./AppVerReservas.html"
            }, 2000);
        } else {
            MostrarError(result.data.msj);
            return
        }


    }

}

//alarms
function MostrarError(txtError) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: txtError,
    })
}

function ConfirmarDatos(txtConfirmar) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: txtConfirmar,
        showConfirmButton: false,
        timer: 1500
    })
}




//MODAL CREAR RESERVA

const modalCrearReserva = document.querySelector('#formCrearReserva');
const overlay = document.querySelector('.overlay');
const closeCrearReserva = document.querySelector('#cerrarModalReserva');
const showCrearReserva = document.getElementById('show-crear-reserva');
const closeCrearReserva2 = document.querySelector('#cerrarCrearR');


const hiddenCrearModal = function () {
    modalCrearReserva.classList.add("hidden");
    overlay.classList.add("hidden");
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalCrearFunct() {
    modalCrearReserva.classList.remove("hidden");
    overlay.classList.remove("hidden");
    location.href = '#top-page';
    window.addEventListener("scroll", disableScroll);

    closeCrearReserva.addEventListener('click', hiddenCrearModal);
    closeCrearReserva2.addEventListener('click', hiddenCrearModal);
    overlay.addEventListener('click', hiddenCrearModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalCrearReserva.classList.contains('hidden')) {
            hiddenCrearModal();
        }
    });
};

showCrearReserva.addEventListener('click', ShowModalCrearFunct);

// FIN MODAL CREAR RESERVA



function llenarModalCancelarReserva(id) {

    for (let i = 0; i < listaReservas.length; i++) {
        if (listaReservas[i].NumeroReservacion == id) {
            document.getElementById('numReservaCancelar').value = id;
            document.getElementById('nombreReservaCancelar').value = listaReservas[i].
            NombreMascota;
        }

    }
}