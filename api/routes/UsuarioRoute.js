'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../models/UsuarioModel');



// router.post('/RegistrarUsuario', (req, res) => {
//     let body = req.body;
//     let nuevaUsuario = new Usuario({
//         Nombre: body.Nombre,
//         Apellido: body.Apellido,
//         Identificacion: body.Identificacion,
//         Email: body.Email,
//         Contrasenia: body.Contrasenia,
//         Direccion: body.Direccion,
//         CalificacionPromedio: body.CalificacionPromedio,
//         Foto: body.Foto,
//         Activo: body.Activo,
//         Rol: body.Rol

//     });
//     nuevaUsuario.save((err, usuarioDB) => {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msj: 'No se pudo registrar el usuario, ocurrio el siguiente error: ',
//                 err
//             });
//         } else {
//             res.json({
//                 resultado: true,
//                 msj: 'Registro realizado de manera correcta',
//                 usuarioDB
//             });
//         }
//     });
// });

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

// router.get('/BuscarUsuario', (req, res) => {
//     let params = req.query;
//     Usuario.findOne({ Identificacion: params.Identificacion }, (err, usuarioDB) => {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msj: 'No se pudo obtener datos: ',
//                 err
//             });
//         } else {

//             res.json({
//                 resultado: true,
//                 msj: 'Los datos se obtuvieron de manera correcta: ',
//                 usuarioDB
//             });
//         }
//     });
// });
// router.get('/BuscarPersonaPorId', (req, res) => {
//     let params = req.query;
//     Persona.findOne({_id: params._id}, (err, personaDB) => {
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
//                 personaDB
//             });
//         }
//     });
// });
// router.get('/AutenticarUsuario', (req, res) => {
//     let params = req.query;
//     Persona.findOne({
//         Email: params.Email,
//         Password: params.Password
//     }, (err, personaDB) => {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msj: 'No se pudo obtener datos: ',
//                 err
//             });
//         } else {
//             if (personaDB == null) {
//                 res.json({
//                     resultado: false,
//                     msj: 'Usuario y/o contraseña incorrectos ',
//                     personaDB
//                 });
//             } else if (Number(personaDB.Estado) == 0) {
//                 //inactivo                
//                 res.json({
//                     resultado: false,
//                     msj: 'Usuario inactivo, por favor comuniquese con el administrador ',
//                     personaDB
//                 });
//             } else {
//                 res.json({
//                     resultado: true,
//                     msj: 'Los datos se obtuvieron de manera correcta: ',
//                     personaDB
//                 });
//             }
//         }
//     });
// });
// router.delete('/EliminarPersona', function (req, res) {
//     let body = req.body;
//     Persona.remove({ _id: body._id }, (err, result) => {
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
// router.put('/ModificarPersona', function (req, res) {
//     let body = req.body;
//     Persona.updateOne({ _id: body._id }, {
//         $set: req.body 
//         // $set: {
//         //     Nombre: body.Nombre,
//         //     Edad: body.Edad
//         // }
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
//                 msj: 'Los datos se actualizaron de manera correcta',
//                 info
//             });
//         }
//     }
//     );
// });
// router.put('/DesactivarPersona', function(req, res){
//     let body = req.body;
//     Persona.updateOne({ _id: body._id }, {
//         $set: {
//             Estado: 0
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
//                 msj: 'Persona inactivada de manera correcta',
//                 info
//             });
//         }
//     });

// });

module.exports = router;
