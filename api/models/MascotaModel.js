'use strict';

const mongoose = require('mongoose');



const schemaMascota = new mongoose.Schema(
    {   
        Identificacion: { type: String, required: true, unique: true },
        Nombre: { type: String, required: true, unique: false },
        Direccion:  { type: String, required: true, unique: false },
        CalificacionPromedio: { type: Number, required: false, unique: false },
        Foto: { type: String, required: false, unique: false },
        Activo:{ type: Number, required: true, unique: false },
    }
);


module.exports = mongoose.model('Mascota', schemaUsuario, 'Mascotas');