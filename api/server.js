'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

        
const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Se crea la variable db, que almacena la instancia de la base de datos, para ser reutilizada en el "callback".
let db;

//Se conecta la base de datos antes de levantar el servidor, mediante los datos del archivo .env en la raíz del proyecto.
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true, useUnifiedTopology:true}, function(err, database){
    if (err) {
       console.log(err); 
       process.exit(1);
    }

    //Guarda objeto para que el callback la pueda reutilizar
    db = database;
    console.log('Se establecio la conexion con la base de datos');

    const server = app.listen(process.env.PORT || 5000, function(){
        let port = server.address().port;
        console.log('La aplicacion esta levantada en el puerto: ', port);
    });
});

//Error general en caso de que falle el "endpoint"
function hadleError(res, reason, message, code) {
    console.log('ERROR: ', reason);
    res.status(code || 500).json({ "error": message });
}

//conexion a todas las rutas del BackEnd

const usuarios = require('./routes/UsuarioRoute');
app.use('/api', usuarios);

const mascotas = require('./routes/MascotaRoute');
app.use('/api', mascotas);

const citas = require('./routes/CitaRoute');
app.use('/api', citas);

const veterinario = require('./routes/VeterinariosRoute');
app.use('/api', veterinario);

const reservaciones = require('./routes/ReservacionRoute');
app.use('/api', reservaciones);

const facturas = require('./routes/FacturaRoute');
app.use('/api', facturas);