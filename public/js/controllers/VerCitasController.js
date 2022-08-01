'use strict'

var listaCitas;

window.addEventListener('load', () => {
    cargaJsonCitas();
    cargaJson();

    setTimeout(() => { ImprimirListaCitas(); }, 1000);
});


function ImprimirListaCitas() {
    let tbody = document.getElementById('tbdCitas');

    let listaCitas = getCitasArray();

    tbody.innerHTML = '';

    for (let i = 0; i < listaCitas.length; i++) {

        let cita = listaCitas[i];
        let veterinario = buscaUsuarioID(cita.IdentificacionVeterinario);

        let fila = tbody.insertRow();
        let celdaNumCita = fila.insertCell();
        let celdaMascota = fila.insertCell();
        let celdaVeterinario = fila.insertCell();
        let celdaFecha = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaBoton = fila.insertCell();

        celdaNumCita.innerHTML = cita.NumeroCita;
        celdaNumCita.classList.add('infoTd');
        celdaMascota.innerHTML = cita.NombreMascota;
        celdaMascota.classList.add('infoTd');
        celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;
        celdaVeterinario.classList.add('infoTd');
        celdaFecha.innerHTML = cita.FechaHora;
        celdaFecha.classList.add('infoTd');
        celdaEstado.innerHTML = cita.Estado;
        celdaEstado.classList.add('Estado');
        celdaEstado.classList.add('infoTd');

        // let Boton = document.createElement('a');
        // Boton.innerHTML = 'Detalle';
        // Boton.setAttribute('href','#')
        // Boton.classList.add('btn');
        // celdaBoton.appendChild(Boton);
        let EstadoCitaif = document.querySelectorAll('.Estado');
        if (EstadoCitaif[i].innerHTML == 'AGENDADA') {
            let BotonV = document.createElement('a');
            BotonV.setAttribute('href', '#')
            let iconoV = document.createElement('i');
            iconoV.classList.add("fa-solid")
            iconoV.classList.add("fa-eye")
            iconoV.classList.add("btnV")
            BotonV.appendChild(iconoV);
            celdaBoton.appendChild(BotonV);


            let Boton = document.createElement('a');
            Boton.setAttribute('href', '#')
            let icono = document.createElement('i');
            icono.classList.add("fa-solid")
            icono.classList.add("fa-pen-to-square")
            icono.classList.add("btnEd")
            Boton.appendChild(icono);
            celdaBoton.appendChild(Boton);

            let BotonC = document.createElement('a');
            BotonC.setAttribute('onclick', 'ShowModalCancelFunct()');
            let iconoC = document.createElement('i');
            iconoC.classList.add("fa-solid")
            iconoC.classList.add("fa-circle-xmark")
            iconoC.classList.add("btnCa")
            BotonC.appendChild(iconoC);
            celdaBoton.appendChild(BotonC);
        } else {
            let BotonV = document.createElement('a');
            BotonV.setAttribute('href', '#')
            let iconoV = document.createElement('i');
            iconoV.classList.add("fa-solid")
            iconoV.classList.add("fa-eye")
            iconoV.classList.add("btnV")
            BotonV.appendChild(iconoV);
            celdaBoton.appendChild(BotonV);
        }


    }
    let EstadoCita = document.querySelectorAll('.Estado');
    console.log(EstadoCita.length);
    VerEstado(EstadoCita);
}





// function ImprimirListaReservas(){
//     let tbody = document.getElementById('tbdReservas');

//     let listaReservas = ObtenerListaReservas();

//     tbody.innerHTML = '';

//     for (let i = 0; i < listaReservas.length; i++) {

//         let fila = tbody.insertRow();
//         let celdaNumReserva = fila.insertCell();
//         let celdaMascota = fila.insertCell();
//         let celdafechaEnt = fila.insertCell();
//         let celdaFecha= fila.insertCell();
//         let celdaEstado = fila.insertCell();
//         let celdaBoton = fila.insertCell();

//         celdaNumReserva.innerHTML = listaReservas[i][1];
//         celdaNumReserva.classList.add('infoTd');
//         celdaMascota.innerHTML = listaReservas[i][2];
//         celdaMascota.classList.add('infoTd');
//         celdafechaEnt.innerHTML = listaReservas[i][3];
//         celdafechaEnt.classList.add('infoTd');
//         celdaFecha.innerHTML = listaReservas[i][4];
//         celdaFecha.classList.add('infoTd');
//         celdaEstado.innerHTML = listaReservas[i][5];
//         celdaEstado.classList.add('Estado');
//         celdaEstado.classList.add('infoTd');

//         let EstadoCitaif = document.querySelectorAll('.Estado');
//         if (EstadoCitaif[i].innerHTML == 'Pendiente' ) {
//         let BotonV = document.createElement('a');
//         BotonV.setAttribute('href','#')
//         let iconoV =document.createElement('i');
//         iconoV.classList.add("fa-solid")
//         iconoV.classList.add("fa-eye")
//         iconoV.classList.add("btnV")
//         BotonV.appendChild(iconoV);
//         celdaBoton.appendChild(BotonV);

//         let Boton = document.createElement('a');
//         Boton.setAttribute('href','#')
//         let icono =document.createElement('i');
//         icono.classList.add("fa-solid")
//         icono.classList.add("fa-pen-to-square")
//         icono.classList.add("btnEd")
//         Boton.appendChild(icono);
//         celdaBoton.appendChild(Boton);

//         let BotonC = document.createElement('a');
//         BotonC.setAttribute('onclick','ShowModalCancelReservaFunct()');
//         let iconoC =document.createElement('i');
//         iconoC.classList.add("fa-solid")
//         iconoC.classList.add("fa-circle-xmark")
//         iconoC.classList.add("btnCa")
//         BotonC.appendChild(iconoC);
//         celdaBoton.appendChild(BotonC);
//         }else{
//         let BotonV = document.createElement('a');
//         BotonV.setAttribute('href','#')
//         let iconoV =document.createElement('i');
//         iconoV.classList.add("fa-solid")
//         iconoV.classList.add("fa-eye")
//         iconoV.classList.add("btnV")
//         BotonV.appendChild(iconoV);
//         celdaBoton.appendChild(BotonV);
//         }


//     }
//     let EstadoCita = document.querySelectorAll('.Estado');
//         console.log(EstadoCita.length);
//         VerEstado(EstadoCita);
// }


function VerEstado(EstadoCita) {

    for (let i = 0; i < EstadoCita.length; i++) {
        let sEstadoCita = EstadoCita[i].innerHTML;
        console.log(sEstadoCita)
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