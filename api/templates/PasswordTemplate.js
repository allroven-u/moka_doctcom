'use strict'

const nodemailer = require('nodemailer');
require('dotenv').config();


this.EnviarMail = (pCorreo) => {
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
        subject:'Correo de recuperación',
        html: `
        <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="2d3436">
        <tr heigth="200px">
            <td>
                <h3 style="color:#000; text-align:center">
                    ¡El proceso de recuperación de contraseña fue realizado con éxito!
                </h3>
                
                <p style="color:#000;"> Usuario: ${pCorreo} </p>
                <p style="color:#000;"> Contraseña: Df1234</p>

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