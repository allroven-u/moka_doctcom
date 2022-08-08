"use strict";

// const { json } = require("body-parser");

let usuariosArray = []; // arreglo de usuarios

// Esta funcion carga un archivo tipo json y lo carga a un array utilizando un promesa de js
// function cargaJson() {

//   fetch("/public/assets/data/infoUsuarios.json")
//     .then((response) => response.json())
//     .then((response) => {
//       usuariosArray = response;
//       console.log(usuariosArray);
//     });
//   return usuariosArray;
// }

//Esta funcion busca un objeto dentro del arreglo de usuario segun el campo de usurio y lo devuelve en formato object.
function buscaUsuario(pUsuario) {
  let result = null;
  for (let i = 0; i < usuariosArray.length; i++) {
    if (usuariosArray[i].Usuario.toUpperCase() === pUsuario) {
      result = usuariosArray[i];
    }
  }
  return result;
}

//Esta funcion busca un objeto dentro del arreglo de usuario segun el campo de id usuario y lo devuelve en formato object.
function buscaUsuarioID(pUsuarioID) {
 let result = null;
 for (let i = 0; i < usuariosArray.length; i++) {
   if (usuariosArray[i].Identificacion === pUsuarioID) {
     result = usuariosArray[i];
   }
 }
 console.log(result);

 if (result != null) {
  return result;
 } else {
  return '';
 }

}

function getListaUsuarios(){
  return usuariosArray;
}

//Esta funcion valida si el login es correcto devuelve un booleano.
async function validarLogin(pEmail, pClave) {
  let result = {};
  await  axios.get(apiUrl + '/AutenticarUsuario', {
    responseType: 'json',
    params: {
      Email: pEmail,
      Contrasenia: pClave
    }
  }).then((res)=>{
    result = res.data;
    if (result.resultado) {
      SetSesion(result.UsuarioDB);
    }
  }).catch((err)=>{
    console.log(err);
  });
return result.resultado;
}

function getUsuariosArray(){
  return usuariosArray;
  };
