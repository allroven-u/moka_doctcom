'use strict';

const mongoose = require('mongoose');

const schemaReserva = new mongoose.Schema(
    {
        NumeroReservacion: { type: Number, required: true, unique: true },
        IdentificacionUsuario:{ type: String, required: true, unique: false },
        IdMascota:{ type: String, required: true, unique: false },
        NombreMascota: { type: String, required: true, unique: false },
        FechaHoraIngreso: { type: String, required: true, unique: false },
        FechaHoraSalida: { type: String, required: true, unique: false },
        Calificacion: { type: Number, required: false, unique: false },
        Estado: { type: String, required: true, unique: false },
        ObservacionesReservacion: { type: String, required: false, unique: false },
        NotasCancelacion: { type: String, required: false, unique: false },
        NumeroFactura: { type: Number, required: false, unique: false },
    }
);

module.exports = mongoose.model('Reserva', schemaReserva, 'Reservas');