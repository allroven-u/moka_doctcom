'use strict';

const mongoose = require('mongoose');

const schemaFactura = new mongoose.Schema(
    {
        NumeroFactura: { type: Number, required: true, unique: true },
        IdentificacionUsuario:{ type: String, required: true, unique: false },
        IdMascota:{ type: String, required: true, unique: false },
        NombreMascota: { type: String, required: true, unique: false },
        Fecha: {type:Date,require:true,unique:false},
        Estado: { type: String, required: true, unique: false },
        ObservacionesFactura: { type: String, required: false, unique: false },
        Lineas:[{
            NumeroLinea: { type: Number, required: true, unique: false },
            Descripcion: { type: String, required: true, unique: false },
            Cantidad: { type: Number, required: true, unique: false },
            PrecioUnitario: { type: Number, required: true, unique: false },
        }]
    }
);

module.exports = mongoose.model('Factura', schemaFactura, 'Facturas');