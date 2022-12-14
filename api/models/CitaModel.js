'use strict';

const mongoose = require('mongoose');

const schemaCita = new mongoose.Schema(
    {
        NumeroCita: { type: Number, required: true, unique: true },
        IdentificacionUsuario:{ type: String, required: true, unique: false },
        IdMascota:{ type: String, required: true, unique: false },
        NombreMascota: { type: String, required: true, unique: false },
        Calificacion: { type: Number, required: false, unique: false },
        Estado: { type: String, required: true, unique: false },
        IdentificacionVeterinario:{ type: String, required: false, unique: false },
        ObservacionesVeterinario: { type: String, required: false, unique: false },
        ObservacionesCita: { type: String, required: false, unique: false },
        NotasCancelacion: { type: String, required: false, unique: false },
        Fecha: {type:Date,require:true,unique:false},
        NumeroFactura: { type: Number, required: false, unique: false },
        FechaCreacion: {type:Date,require:true,unique:false},
        UsuarioCreacion:{ type: String, required: true, unique: false },
        CalificacionVeterinario: { type: Number, required: false, unique: false },
    }
);

module.exports = mongoose.model('Cita', schemaCita, 'Citas');
