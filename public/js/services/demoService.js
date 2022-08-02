'use strict'
//Citas
let listaCitas = [
    ['idCliente', '0045', 'Baloo', 'Jorge Mendez', '23/07/2022', 'Finalizada', 'calif', 'observaciones'],
    ['idCliente', '0095', 'Paquito', 'Macario Rodriguez', '25/07/2022', 'Pendiente', 'calif', 'observaciones'],
    ['idCliente', '0128', 'Maximo', 'Alicia Solis', '30/07/2022', 'Cancelada', 'calif', 'observaciones']
]

function RegistrarCita(psId, pnCita, psMascota, psVeterinario, psFecha, psEstdo, pnCalif, psObservaciones) {
    let nuevaCita = [];
    nuevaCita.push(psId, pnCita, psMascota, psVeterinario, psFecha, psEstdo, pnCalif, psObservaciones);

    listaCitas.push(nuevaCita);
}

function ObtenerListaCitas() {
    return listaCitas;
}

//Reservaciones

let listaReservas = [
    ['idCliente', '0126', 'Maximo', '20/07/2022', '23/07/2022', 'Finalizada', 'calif', 'observaciones'],
    ['idCliente', '0245', 'Baloo', '25/07/2022', '28/07/2022', 'Cancelada', 'calif', 'observaciones'],
    ['idCliente', '0366', 'Maximo', '29/07/2022', '31/07/2022', 'Pendiente', 'calif', 'observaciones'],
]

function RegistrarReserva(psId, pnReserva, psMascota, pscheckIn, psCheckOut, psEstdo, pnCalif, psObservaciones) {
    let nuevaReserva = [];
    nuevaReserva.push(psId, pnReserva, psMascota, pscheckIn, psCheckOut, psEstdo, pnCalif, psObservaciones);

    listaReservas.push(nuevaReserva);
}

function ObtenerListaReservas() {
    return listaReservas;
}
//Mascotas
let listaMascotas = [
    ['idCliente', 'nombreMascota', 'Direccion'],
    ['206790172', 'baloo', 'Alajuela'],
    ['206790172', 'Copito', 'Alajuela'],
    ['206790172', 'Maximo', 'Alajuela'],
    ['206790173', 'Moly', 'Heredia'],

]

function RegistrarMascota(psID, psNombreMAscota, psDireccion) {
    let nuevaMascota = [];
    nuevaMascota.push(psID, psNombreMAscota, psDireccion);

    listaMascotas.push(nuevaMascota);
}

function ObtenerListaMascotas() {
    return listaMascotas;
}