'use strict';

const mongoose = require('mongoose');

const schemaMascota = new mongoose.Schema(
    {   
        IdentificacionDuenio: { type: String, required: true, unique: false },
        NombreMascota: { type: String, required: true, unique: false },
        Direccion:  { type: String, required: true, unique: false },
        CalificacionPromedio: { type: Number, required: false, unique: false },
        Activo:{ type: Number, required: true, unique: false },
        Estado:{ type: String, required: true, unique: false },
        Latitud:{ type: String, required: false, unique: false },
        Longitud:{ type: String, required: false, unique: false },
        Foto: { type: String, required: false, unique: false },
    }
);


module.exports = mongoose.model('Mascota', schemaMascota, 'Mascotas');