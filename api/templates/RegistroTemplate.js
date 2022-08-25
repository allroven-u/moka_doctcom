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
        html: `<table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="2d3436" bgcolor
        <tr heigth="200px">
            <td>
                <h1 style="color:#fff; text-align:center">
                    Bienvenido
                </h1>
                <p stryle="color:#fff; text-align:center">
                    <span style:"color:#e84343">
                        ${pNombreCompleto}
                    </span>
                    a la aplicacion
                </p>
            </td>
    ]   </tr>
        <tr>
            <td style="text-align:center;">
            <ps tyle="color:#000;"> Un mundo de servicios a su disposición</p>
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