'use strict';

const express = require('express');
const router = express.Router();
const Mascota = require('../models/TarjetaModel');



router.post('/RegistrarTarjeta', (req, res) => {
    let body = req.body;
    let nuevaMascota = new Tarjeta({
        Identificacion: body.Identificacion,
        NumeroTarjeta: body.NumeroTarjeta,
        MesVenceTarjeta: body.MesVenceTarjeta,
        AnioVenceTarjeta: body.AnioVenceTarjeta,
        Principal: body.Principal,
        Tipo: body.Tipo,
        Activo: body.Activo,
    });

    nuevaMascota.save((err, MascotaDB) => {
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
                MascotaDB
            });
        }
    });
});

router.get('/ListarMascota', (req, res) => {
    Mascota.find((err, ListaMascotasBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                ListaMascotasBD
            });
        }
    });
});

router.get('/BuscarMascotaIDDuenio', (req, res) => {
    let params = req.query;
    Mascota.find({ IdentificacionDuenio: params.IdentificacionDuenio }, (err, MascotaDB) => {
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
                MascotaDB
            });
        }
    });
});

router.get('/BuscarIDMascota', (req, res) => {
    let params = req.query;
    Mascota.findOne({ _id: params._id }, (err, MascotaDB) => {
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
                MascotaDB
            });
        }
    });
});


router.put('/ModificarMascota', function (req, res) {
    let body = req.body;
    Mascota.updateOne({ _id: body._id }, {
        $set: req.body 
        // $set: {
        //     Nombre: body.Nombre,
        //     Edad: body.Edad
        // }
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
router.put('/DesactivarMascota', function(req, res){
    let body = req.body;
    Mascota.updateOne({ _id: body._id }, {
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
