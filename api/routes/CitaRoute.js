'use strict';

const express = require('express');
const router = express.Router();
const Cita = require('../models/CitaModel');



router.post('/RegistrarCita', (req, res) => {
    let body = req.body;
    let nuevaCita = new Cita({
        NumeroCita: body.NumeroCita,
        IdentificacionUsuario:body.IdentificacionUsuario,
        IdMascota: body.IdMascota,
        NombreMascota: body.NombreMascota,
        Fecha: body.Fecha,
        Calificacion:body.Calificacion,
        Estado: body.Estado,
        IdentificacionVeterinario: body.IdentificacionVeterinario,
        ObservacionesVeterinario: body.ObservacionesVeterinario,
        ObservacionesCita: body.ObservacionesCita,
        NotasCancelacion : body.NotasCancelacion,
        NumeroFactura : body.NumeroFactura,
        FechaCreacion : body.FechaCreacion,
        UsuarioCreacion : body.UsuarioCreacion,
        CalificacionVeterinario : body.CalificacionVeterinario
    });

    nuevaCita.save((err, citaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la Cita, ocurrio el siguiente error: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                citaDB
            });
        }
    });
});

router.get('/ListarCitas', (req, res) => {
    Cita.find((err, ListaCitasBD) => {
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
                ListaCitasBD
            });
        }
    }).sort({$natural:-1});
});

router.get('/MiListarCitas', (req, res) => {
    let params = req.query;
    Cita.find({"IdentificacionUsuario":params.IdentificacionUsuario},(err, ListaCitasBD) => {
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
                ListaCitasBD
            });
        }
    }).sort({$natural:-1});
});

router.get('/UltimaCita', (req, res) => {
    Cita.find((err, ListaCitasBD) => {
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
                ListaCitasBD
            });
        }
    }).sort({$natural:-1}).limit(1);
});



router.get('/ListarCitasVet', (req, res) => {
    let params = req.query;
    Cita.find({"IdentificacionVeterinario":params.IdentificacionVeterinario},(err, ListaCitasBD) => {
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
                ListaCitasBD
            });
        }
    }).sort({$natural:-1});
});


router.get('/FiltarCita', (req, res) => {
    let params = req.query;
    
    Cita.find({"Fecha":{"$gte" : params.fechaInicio,"$lte": params.fechaFinal},"Estado":{"$in" : params.Estado}
},(err, ListaCitasBD) => {
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
                ListaCitasBD
            });
        }
    },).sort({$natural:-1}).limit(50);
});


router.get('/AvgCalificacionMascota', (req, res) => {
    let params = req.query;

    Cita.aggregate([ 
        { "$match": {IdMascota: params.IdMascota} },
        {
            "$group": {
                _id: "$IdMascota", "Promedio":{$avg:"$Calificacion"}
                }
        }] ,(err, info) => {
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
                info
            });
        }
    },);
});

router.get('/BuscarCita', (req, res) => {
    let params = req.query;
    Cita.findOne({ NumeroCita: params.NumeroCita }, (err, citaDB) => {
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
                citaDB
            });
        }
    });
});
router.get('/BuscarCitaPorId', (req, res) => {
    let params = req.query;
    Cita.findOne({_id: params._id}, (err, CitaDB) => {
        if (err) {            
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos: ',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                CitaDB
            });
        }
    });
});

router.put('/CancelarCita', function (req, res) {
    let body = req.body;
    Cita.updateMany({ NumeroCita: body.NumeroCita }, {
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

router.put('/ModificarCita', function (req, res) {
    let body = req.body;
    Cita.updateMany({_id: body._id }, {
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
