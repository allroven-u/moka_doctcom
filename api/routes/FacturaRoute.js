'use strict';

const express = require('express');
const router = express.Router();
const Factura = require('../models/FacturaModel');



router.post('/RegistrarFactura', (req, res) => {
    let body = req.body;
    let nuevaFactura = new Factura({
        NumeroFactura :body.NumeroFactura,
        IdentificacionUsuario : body.IdentificacionUsuario,
        IdMascota :body.IdMascota,
        NombreMascota : body.NombreMascota,
        Fecha : body.Fecha,
        Estado: body.Estado,
        ObservacionesFactura: body.ObservacionesFactura
    });

    nuevaFactura.save((err, facturaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la factura, ocurrio el siguiente error: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                facturaDB
            });
        }
    });
});

router.get('/ListarFacturas', (req, res) => {
    Factura.find((err, ListaFacturasBD) => {
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
                ListaFacturasBD
            });
        }
    }).sort({$natural:-1});
});

router.get('/UltimaFactura', (req, res) => {
    Factura.find((err, UltimaFacturaBD) => {
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
                UltimaFacturaBD
            });
        }
    }).sort({$natural:-1}).limit(1);
});

router.get('/MiListarfacturas', (req, res) => {
    let params = req.query;
    Factura.find({"IdentificacionUsuario":params.IdentificacionUsuario},(err, ListaFacturasBD) => {
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
                ListaFacturasBD
            });
        }
    }).sort({$natural:-1});
});



router.get('/FiltarFactura', (req, res) => {
    let params = req.query;
    
    Factura.find({"Fecha":{"$gte" : new Date(params.fechaInicio),"$lte": new Date(params.fechaFinal)}},(err, ListaFacturasBD) => {
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
                ListaFacturasBD
            });
        }
    },).sort({$natural:-1}).limit(100);
});

router.get('/BuscarFacturas', (req, res) => {
    let params = req.query;
    Factura.findOne({ NumeroFactura: params.NumeroFactura }, (err, FacturaDB) => {
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
                FacturaDB
            });
        }
    });
});


router.post('/RegistrarLinea', (req, res) =>{
    let body = req.body;
    Factura.updateOne({_id: body._id},{
        $push:{
            Lineas:{
                NumeroLinea: body.NumeroLinea,
                Descripcion: body.Descripcion,
                Cantidad: body.Cantidad,
                PrecioUnitario: body.PrecioUnitario
            }
        }
    }, function (err, info){
        if(err){
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se realizo el registro de la linea',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'La linea se agrego de manera correcta',
                info
            });
        }
    });
});

// router.put('/CancelarCita', function(req, res){
//     let body = req.body;
//     Cita.updateOne({ NumeroCita: body.NumeroCita }, {
//         $set: {
//             Estado: 'Cancelado'
//         }
//     }, function (err, info) {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msj: 'Ocurrio un error inesperado y no se pudieron actualizar los datos: ',
//                 err
//             });
//         } else {
//             res.json({
//                 resultado: true,
//                 msj: 'Usuario inactivada de manera correcta',
//                 info
//             });
//         }
//     });

// });

module.exports = router;
