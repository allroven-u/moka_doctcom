'use strict';

const mongoose = require('mongoose');



const schemaVeterinario = new mongoose.Schema(
    {
        Identificacion: { type: String, required: true, unique: true },
        Especialidad: { type: String, required: false, unique: false },
        InfoVet:{ type: String, required: false, unique: false }   
    }
);


module.exports = mongoose.model('veterinario', schemaVeterinario, 'Veterinarios');