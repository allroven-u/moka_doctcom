'use strict';

const mongoose = require('mongoose');

const schemaTarjeta = new mongoose.Schema(
    {   
        Identificacion: { type: String, required: true, unique: false },
        NumeroTarjeta: { type: String, required: true, unique: true },
        MesVenceTarjeta:  { type: String, required: true, unique: false },
        AnioVenceTarjeta: { type: String, required: false, unique: false },
        Principal:{ type: String, required: true, unique: false },
        Tipo:{ type: String, required: true, unique: false },
        Activo:{ type: Number, required: false, unique: false },
    }
);


module.exports = mongoose.model('Tarjeta', schemaTarjeta, 'Tarjetas');