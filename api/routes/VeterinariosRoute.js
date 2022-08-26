'use strict';

const express = require('express');
const router = express.Router();
const veterinario = require('../models/VeterinarioModel'); 



router.post('/RegistrarDatosVet', (req, res) => {
    let body = req.body;
    let nuevaVeterinario = new veterinario({
        Identificacion: body.Identificacion,
        Especialidad : body.Especialidad,
        InfoVet : body.InfoVet
    });

    nuevaVeterinario.save((err, VeterinarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el Veterinario!',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                VeterinarioDB
            });
        }
    });
});



router.put('/ModificarInfoVet', function (req, res) {
    let body = req.body;
    veterinario.updateOne({ Identificacion: body.Identificacion}, {
        $set: req.body 
    }, function (err, info) {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se pudieron actualizar los datos: ',
                err
            });
        } else {

            res.json({
                resultado: true,
                msj: 'Los datos se actualizaron de manera correcta',
                info
            });
        }
    }
    );
});



router.get('/BuscarVeterinario', (req, res) => {
    let params = req.query;
    veterinario.findOne({ Identificacion: params.Identificacion }, (err, VeterinarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos: ',
                err
            });
        } else {

            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                VeterinarioDB
            });
        }
    });
});

module.exports = router;