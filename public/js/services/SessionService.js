'use strict';

function SetSesion(pDatosUsuario) {
    localStorage.setItem('DatosSesion', JSON.stringify(pDatosUsuario)); 
}

function LogoutSesion() {
    localStorage.removeItem('DatosSesion');
}

function GetSesion() {
    let usuario = null;
    let localStorageData = localStorage.getItem('DatosSesion');
    if (localStorageData != null && localStorageData != undefined && localStorageData != '') {
        usuario = JSON.parse(localStorageData);
    }
    return usuario;
}