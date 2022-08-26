'use strict'

const nodemailer = require('nodemailer');
require('dotenv').config();


this.EnviarMail = (pNombreCompleto,pCorreo) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.MAILUSER,
            pass: process.env.MAILPASSWORD
        }
    });

    let mailOptions = {
        from:process.env.MAILUSER,
        to:pCorreo,
        subject:'Correo de bienvenida',
        html: `
        <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="2d3436" bgcolorbgcolor="#2d3436">
        <tr heigth="200px">
            <td>
            <p stryle="color:#000; text-align:center">
            Hola 
            <span>
                ${pNombreCompleto}
            </span>
            </p>
                <h1 style="color:#000; text-align:center">
                    ¡Bienvenido a Moka veterinaria!
                </h1>

            </td>
       </tr>
        <tr>
            <td style="text-align:center;">
            <p style="color:#000;"> Moka la mejor amiga de tu mascota.</p>
            </td>
        </tr>
        `
    }

    transporter.sendMail(mailOptions, (err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log('El correo se envio de manera correcta' + info.response);
        }
    });
};

module.exports = this;