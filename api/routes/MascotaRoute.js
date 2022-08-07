'use strict';

const express = require('express');
const router = express.Router();
const Mascota = require('../models/MascotaModel');



router.post('/RegistrarMascota', (req, res) => {
    let body = req.body;
    let nuevaMascota = new Mascota({
        IdentificacionDuenio: body.IdentificacionDuenio,
        NombreMascota: body.NombreMascota,
        Direccion: body.Direccion,
        CalificacionPromedio: body.CalificacionPromedio,
        Activo: body.Activo,
        Estado: body.Estado,
        Latitud: body.Latitud,
        Longitud:body.Longitud,
        Foto: body.Foto,
        


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

router.get('/BuscarMascota', (req, res) => {
    let params = req.query;
    Mascota.findOne({ Identificacion: params.Identificacion }, (err, MascotaDB) => {
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
    Mascota.updateOne({ Identificacion: body.Identificacion }, {
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
    Mascota.updateOne({ Identificacion: body.Identificacion }, {
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
                msj: 'Usuario inactivada de manera correcta',
                info
            });
        }
    });

});

module.exports = router;
