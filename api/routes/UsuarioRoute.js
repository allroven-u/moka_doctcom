'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../models/UsuarioModel');



router.post('/RegistrarUsuario', (req, res) => {
    let body = req.body;
    let nuevaUsuario = new Usuario({
        Nombre: body.Nombre,
        Apellido: body.Apellido,
        Identificacion: body.Identificacion,
        Email: body.Email,
        Contrasenia: body.Contrasenia,
        Direccion: body.Direccion,
        CalificacionPromedio: body.CalificacionPromedio,
        Foto: body.Foto,
        Activo: body.Activo,
        Rol: body.Rol

    });

    nuevaUsuario.save((err, usuarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario!',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                usuarioDB
            });
        }
    });
});

router.get('/ListarUsuario', (req, res) => {
    Usuario.find((err, ListaUsuariosBD) => {
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
                ListaUsuariosBD
            });
        }
    });
});

router.get('/BuscarUsuario', (req, res) => {
    let params = req.query;
    Usuario.findOne({ Identificacion: params.Identificacion }, (err, usuarioDB) => {
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
                usuarioDB
            });
        }
    });
});

router.get('/AutenticarUsuario', (req, res) => {
    let params = req.query;
    Usuario.findOne({
        Email: params.Email,
        Contrasenia: params.Contrasenia //revisar
    }, (err, UsuarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos: ',
                err
            });
        } else {
            if (UsuarioDB == null) {
                res.json({
                    resultado: false,
                    msj: 'Usuario y/o contraseña incorrectos ',
                    UsuarioDB
                });
            } else if (Number(UsuarioDB.Estado) == 0) {
                //inactivo                
                res.json({
                    resultado: false,
                    msj: 'Usuario inactivo, por favor comuniquese con el administrador ',
                    UsuarioDB
                });
            } else {
                res.json({
                    resultado: true,
                    msj: 'Los datos se obtuvieron de manera correcta: ',
                    UsuarioDB
                });
            }
        }
    });
});
router.delete('/EliminarUsuario', function (req, res) {
    let body = req.body;
    Usuario.remove({Identificacion: body.Identificacion}, (err, result) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se eliminarion de manera correcta',
                result
            });
        }
    });
});
router.put('/ModificarUsuario', function (req, res) {
    let body = req.body;
    Usuario.updateOne({ _id: body._id}, {
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
router.put('/DesactivarUsuario', function(req, res){
    let body = req.body;
    Usuario.updateOne({ Identificacion: body.Identificacion }, {
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

router.post('/RegistrarTarjeta', (req, res) =>{
    let body = req.body;
    Usuario.updateOne({_id: body._id},{
        $push:{
            Tarjetas:{
                NombreTarjetahabiente: body.NombreTarjetahabiente,
                NumeroTarjeta: body.NumeroTarjeta,
                MesVencimiento: body.MesVencimiento,
                AnioVencimiento: body.AnioVencimiento,
                CVV: body.CVV
            }
        }
    }, function (err, info){
        if(err){
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se realizo el registro de la tarjeta',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'Las tarjetas se actualizaron de manera correcta',
                info
            });
        }
    });
});



module.exports = router;
