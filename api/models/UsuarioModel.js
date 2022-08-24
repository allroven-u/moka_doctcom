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
        Fecha:{type:Date, require:true,unique:false},
        Tarjetas:[
            {
                NombreTarjetahabiente:{ type: String, required: true, unique: false },
                NumeroTarjeta:{ type: String, required: true, unique: false },
                MesVencimiento:{type: String, required: true, unique: false},
                AnioVencimiento:{type: String, required: true, unique: false},
                CVV:{ type: String, required: true, unique: false },
                Activo:{ type: Number, required: true, unique: false },
                Principal:{ type: Number, required: true, unique: false },
            }
        ]
    }
);


module.exports = mongoose.model('Usuario', schemaUsuario, 'Usuarios');