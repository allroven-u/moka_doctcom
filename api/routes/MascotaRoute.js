'use strict';

const express = require('express');
const router = express.Router();
const Mascota = require('../models/MascotaModel');



router.post('/RegistrarMascota', (req, res) => {
    let body = req.body;
    let nuevaMascota = new Mascota({
        IdentificacionDuenio: body.Identificacion,
        NombreMascota: body.Nombre,
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
// router.get('/BuscarUsuarioPorId', (req, res) => {
//     let params = req.query;
//     Usuario.findOne({_id: params._id}, (err, UsuarioDB) => {
//         if (err) {            
//             res.json({
//                 resultado: false,
//                 msj: 'No se pudo obtener datos: ',
//                 err
//             });
//         }else{
//             res.json({
//                 resultado: true,
//                 msj: 'Los datos se obtuvieron de manera correcta: ',
//                 UsuarioDB
//             });
//         }
//     });
// });
// router.get('/AutenticarUsuario', (req, res) => {
//     let params = req.query;
//     Usuario.findOne({
//         Email: params.Email,
//         Contrasenia: params.Contrasenia//revisar
//     }, (err, UsuarioDB) => {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msj: 'No se pudo obtener datos: ',
//                 err
//             });
//         } else {
//             if (UsuarioDB == null) {
//                 res.json({
//                     resultado: false,
//                     msj: 'Usuario y/o contraseña incorrectos ',
//                     UsuarioDB
//                 });
//             } else if (Number(UsuarioDB.Estado) == 0) {
//                 //inactivo                
//                 res.json({
//                     resultado: false,
//                     msj: 'Usuario inactivo, por favor comuniquese con el administrador ',
//                     UsuarioDB
//                 });
//             } else {
//                 res.json({
//                     resultado: true,
//                     msj: 'Los datos se obtuvieron de manera correcta: ',
//                     UsuarioDB
//                 });
//             }
//         }
//     });
// });
// router.delete('/EliminarUsuario', function (req, res) {
//     let body = req.body;
//     Usuario.remove({Identificacion: body.Identificacion}, (err, result) => {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msj: 'No se pudo eliminar los datos: ',
//                 err
//             });
//         } else {
//             res.json({
//                 resultado: true,
//                 msj: 'Los datos se eliminarion de manera correcta',
//                 result
//             });
//         }
//     });
// });
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
