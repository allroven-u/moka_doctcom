'use strict';


let imagen;

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'dkdmm2tb5',
    uploadPreset: 'MokaDotcom'
}, (err, result) =>{
    if(!err && result && result.event === 'success'){
        console.log('Imagen subida con exito', result.info);
        imagen.src = result.info.secure_url;
    }
});

function AbrirCloudinary(pidInputImagen){
    imagen = document.getElementById(pidInputImagen);
    widget_cloudinary.open();
}
