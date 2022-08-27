'use strict';

let userSessionR;
let listaUsuarios = [];
let listaMascotas = [];
let listaReservas = [];

let botonFiltrar = document.getElementById("btnFiltroCita");
let fechaInicio = document.getElementById("DateFecha1");
let fechaFinal = document.getElementById("DateFecha2");

let checkAgendada = document.getElementById("chkEstadoAgendada");
let checkFinalizada = document.getElementById("chkEstadoFinalizada");
let checkCancelada = document.getElementById("chkEstadoCancelada");

const inputFiltro = document.getElementById('txtFiltro');




window.addEventListener('load', () => {
    userSessionR = GetSesion();
    GetListaReservas();
    // GetlistaUsuarios();
    // if (userSessionR.Rol == 2) {
    //     GetlistaMascota();
    // }
    // registrarReservaUser()
});



async function GetListaReservas() {
    let result= {};
    switch (userSessionR.Rol) {
        case 2:
          result = await getReservasUsuario(userSessionR.Identificacion);
          break;
        default:
          result =  await getReservasArray();
          break;
    }
    //console.log(result);
    if (result != {} && result.resultado == true) {
       ImprimirListaReservas(result.ListaReservasBD);
    }
}

async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
        listaUsuarios = result.ListaUsuariosBD;
    }
}


async function FiltarListaReservas(pFecha1, pFecha2) {
    let fechaStart =  FilterStartDate(pFecha1);
    let fechaEnd =  FilterEndDate(pFecha2);
  
    let ArrayEstados = [];
  if(checkAgendada.checked){
    ArrayEstados.push(checkAgendada.value);
  }
  if(checkFinalizada.checked){
    ArrayEstados.push(checkFinalizada.value);
  }
  if(checkCancelada.checked){
    ArrayEstados.push(checkCancelada.value);
  }
 
  let result = await FiltrarReservas(fechaStart, fechaEnd,ArrayEstados,userSessionR.Identificacion,userSessionR.Rol);
  if (result != {} && result.resultado == true) {
    ImprimirListaReservas(result.ListaReservasBD);
  }
    // console.log(result);
  }
  
  botonFiltrar.addEventListener("click", () => {
    FiltarListaReservas(fechaInicio.value, fechaFinal.value);
  });

async function ImprimirListaReservas(ListaReservasBD) {

    let tThead = document.getElementById('tTheadReservas');
    let tbody = document.getElementById('tBodyReservas');


    tbody.innerHTML = '';
    tThead.innerHTML = '';
    let filtroReservas = inputFiltro.value;
    // thead
    let thRow = tThead.insertRow();

    let celNumCita = thRow.insertCell();
    celNumCita.innerHTML = 'Num. Reserva';

     let celPropietario = thRow.insertCell();
     celPropietario.innerHTML = 'Propietario';

    let celMascota = thRow.insertCell();
    celMascota.innerHTML = 'Mascota';

    let celFechaEnt = thRow.insertCell();
    celFechaEnt.innerHTML = 'Fecha entrada';

    let celFechaSal = thRow.insertCell();
    celFechaSal.innerHTML = 'Fecha salida';

    let celEstado = thRow.insertCell();
    celEstado.innerHTML = 'Estado';

    // let celAcciones = thRow.insertCell();
    // celAcciones.innerHTML = 'Acciones';


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


    // function compare_numCita(a, b) {
    //     if (a.celNumCita < b.celNumCita) {
    //         return -1;
    //     }
    //     if (a.celNumCita > b.celNumCita) {
    //         return 1;
    //     }
    //     return 0;
    // }

    // listaReservas.sort(compare_numCita);
    // listaReservas.reverse()


    for (let i = 0; i < listaReservas.length; i++) {

        let propietario;
        let reserva = listaReservas[i];

        let resultUsuario = await buscaUsuarioID(reserva.IdentificacionUsuario);
        if (resultUsuario != {} && resultUsuario.resultado == true) {
          propietario = resultUsuario.usuarioDB;
        }

        // if( propietario.Nombre.toLowerCase().includes(filtroCitas.toLowerCase()) ||
        // veterinario.Nombre.toLowerCase().includes(filtroCitas.toLowerCase()) ||
        // veterinario.Apellido.toLowerCase().includes(filtroCitas.toLowerCase()) ||
        // cita.NombreMascota.toLowerCase().includes(filtroCitas.toLowerCase()) ||
        // cita.NumeroCita.toString().includes(filtroCitas.toLowerCase()) 
        // )

        if(propietario.Nombre.toLowerCase().includes(filtroReservas.toLowerCase()) ||
            propietario.Apellido.toLowerCase().includes(filtroReservas.toLowerCase()) ||
            reserva.NombreMascota.toLowerCase().includes(filtroReservas.toLowerCase()) ||
            reserva.NumeroReservacion.toString().includes(filtroReservas.toLowerCase())
        ){
        let fila = tbody.insertRow();

        let celdaNumReserva = fila.insertCell();
        celdaNumReserva.innerHTML = reserva.NumeroReservacion;

        let celdaPropietario = fila.insertCell();
        celdaPropietario.innerHTML = propietario.Nombre + ' '+ propietario.Apellido;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = reserva.NombreMascota;

        let celdafechaEnt = fila.insertCell();
        celdafechaEnt.innerHTML = shortDate(reserva.FechaHoraIngreso);

        let celdaFechaSalida = fila.insertCell();
        celdaFechaSalida.innerHTML = shortDate(reserva.FechaHoraSalida);

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = reserva.Estado;
        celdaEstado.classList.add('Estado');

       // let celdaBoton = fila.insertCell();

        // let EstadoCitaif = document.querySelectorAll('.Estado');

        // if (EstadoCitaif[i].innerHTML == 'AGENDADA') {
        //     if (userSessionR.Rol !== 3) {
        //         let BotonV = document.createElement('a');
        //         BotonV.setAttribute('href', '/public/VerReservacionDatos.html?_id=' + reserva._id + '&rol=' + userSessionR.Rol + '&opcion=ver');
        //         let iconoV = document.createElement('i');
        //         iconoV.classList.add("fa-solid")
        //         iconoV.classList.add("fa-eye")
        //         iconoV.classList.add("btnV")
        //         BotonV.appendChild(iconoV);
        //         celdaBoton.appendChild(BotonV);
        //     }


        //     if (userSessionR.Rol !== 2) {
        //         let Boton = document.createElement('a');
        //         Boton.setAttribute('href', '/public/VerReservacionDatos.html?_id=' + reserva._id + '&rol=' + userSessionR.Rol + '&opcion=compl');
        //         let icono = document.createElement('i');
        //         icono.classList.add("fa-solid")
        //         icono.classList.add("fa-pen-to-square")
        //         icono.classList.add("btnEd")
        //         Boton.appendChild(icono);
        //         celdaBoton.appendChild(Boton);
        //     }

        //     let BotonC = document.createElement('a');
        //     BotonC.setAttribute('id', (reserva.NumeroReservacion));
        //     BotonC.setAttribute('onclick', 'ShowModalCancelReservaFunct(id)');
        //     let iconoC = document.createElement('i');
        //     iconoC.classList.add("fa-solid")
        //     iconoC.classList.add("fa-circle-xmark")
        //     iconoC.classList.add("btnCa")
        //     BotonC.appendChild(iconoC);
        //     celdaBoton.appendChild(BotonC);

        // } else {
        //     let BotonV = document.createElement('a');
        //     BotonV.setAttribute('href', '/public/VerReservacionDatos.html?_id=' + reserva._id + '&rol=' + userSessionR.Rol + '&opcion=final' + "&estado=" + reserva.Estado);
        //     let iconoV = document.createElement('i');
        //     iconoV.classList.add("fa-solid")
        //     iconoV.classList.add("fa-eye")
        //     iconoV.classList.add("btnV")
        //     BotonV.appendChild(iconoV);
        //     celdaBoton.appendChild(BotonV);
        // }

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
