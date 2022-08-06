'use strict';

const mongoose = require('mongoose');



const schemaUsuario = new mongoose.Schema(
    {
        Nombre: { type: String, required: true, unique: false },
        Apellido:{ type: String, required: true, unique: false },
        Identificacion: { type: String, required: true, unique: true },
        Email: { type: String, required: true, unique: true },
        Contrasenia: { type: String, required: true, unique: false },
        Direccion:  { type: String, required: true, unique: false },
        CalificacionPromedio: { type: Number, required: false, unique: false },
        Foto: { type: String, required: false, unique: false },
        Activo:{ type: Number, required: true, unique: false },
        Rol:{ type: Number, required: true, unique: false },
    }
);


module.exports = mongoose.model('Usuario', schemaUsuario, 'Usuarios',);