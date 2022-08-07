'use strict';

const express = require('express');
const router = express.Router();
const Tarjeta = require('../models/TarjetaModel');



router.post('/RegistrarTarjeta', (req, res) => {
    let body = req.body;
    let nuevaTarjeta = new Tarjeta({
        Identificacion: body.Identificacion,
        NumeroTarjeta: body.NumeroTarjeta,
        MesVenceTarjeta: body.MesVenceTarjeta,
        AnioVenceTarjeta: body.AnioVenceTarjeta,
        Principal: body.Principal,
        Tipo: body.Tipo,
        Activo: body.Activo,
    });

    nuevaTarjeta.save((err, TarjetaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la mascota, ocurrio el siguiente error: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                TarjetaDB
            });
        }
    });
});

router.get('/BuscarTarjetaIDDuenio', (req, res) => {
    let params = req.query;
    Tarjeta.find({ Identificacion: params.Identificacion }, (err, TarjetaDB) => {
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
                TarjetaDB
            });
        }
    });
});
//////////////////preguntar//////////////////////
router.get('/BuscarIDTarjeta', (req, res) => {
    let params = req.query;
    Tarjeta.findOne({ _id: params._id }, (err, TarjetaDB) => {
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
                TarjetaDB
            });
        }
    });
});

router.put('/DesactivarTarjeta', function(req, res){
    let body = req.body;
    Tarjeta.updateOne({ _id: body._id }, {
        $set: {
            Activo: 0
        }
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
                msj: 'Mascota inactivada de manera correcta',
                info
            });
        }
    });

});

module.exports = router;
