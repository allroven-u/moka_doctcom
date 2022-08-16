"use strict";

// function buscaUsuario(pUsuario) {
//   let result = null;
//   for (let i = 0; i < usuariosArray.length; i++) {
//     if (usuariosArray[i].Usuario.toUpperCase() === pUsuario) {
//       result = usuariosArray[i];
//     }
//   }
//   return result;
// }

// //Esta funcion busca un objeto dentro del arreglo de usuario segun el campo de id usuario y lo devuelve en formato object.
// function buscaUsuarioID(pUsuarioID) {
//  let result = null;
//  for (let i = 0; i < usuariosArray.length; i++) {
//    if (usuariosArray[i].Identificacion === pUsuarioID) {
//      result = usuariosArray[i];
//    }
//  }
//  console.log(result);

//  if (result != null) {
//   return result;
//  } else {
//   return '';
//  }

// }

// function getListaUsuarios(){
//   return usuariosArray;
// }

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

async function getUsuariosArray(){
  let result = {};
  await  axios.get(apiUrl + '/ListarUsuario', {
    responseType: 'json',
  }).then((res)=>{
    result = res.data;
  }).catch((err)=>{
    console.log(err);
  });
  return result;
  };


  async function RegistrarUsuario(pNombre,pApellido,pIdUsuario,pEmail,pPassword,pDireccion,pFoto) {
    let result ={};
      await axios({
        method:'post',
        url: apiUrl + '/RegistrarUsuario',
        responseType: 'json',
        data: {
          'Nombre': pNombre,
          'Apellido': pApellido,
          'Identificacion': pIdUsuario,
          'Email': pEmail,
          'Contrasenia': pPassword,
          'Direccion': pDireccion,
          'CalificacionPromedio': 0,
          'Foto': pFoto,
          'Activo': 1,
          'Rol': 2
        }

       })
      .then(function (res) {
        result = res;
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });

    return result;
  }

  async function EditarUsuario(pID,pNombre,pApellido,pIdUsuario,pEmail,pDireccion,pFoto) {
    let result ={};
      await axios({
        method:'put',
        url: apiUrl + '/ModificarUsuario',
        responseType: 'json',
        data: {
          '_id': pID,
          'Nombre': pNombre,
          'Apellido': pApellido,
          'Identificacion': pIdUsuario,
          'Email': pEmail,
          'Direccion': pDireccion,
          'Foto': pFoto,
        }
      }).then(async(res) => {
        if(res.data.resultado == false){
            switch (res.data.err.code) {
                case 11000:
                        res.data.msj = 'No se pudo registrar la persona, ya existe una persona registrada con esa identificacion o correo';
                        console.log('No se pudo registrar 11000');
                        console.log(res.data.err);
                    break;            
                default:
                    break;
            }
        }
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
  }

  async function CambiarCotrasenhaUsuario(pID,pPassword) {
    let result ={};
      await axios({
        method:'put',
        url: apiUrl + '/ModificarUsuario',
        responseType: 'json',
        data: {
          '_id': pID,
          'Contrasenia': pPassword,
        }

       })
      .then(function (res) {
        result = res;
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });

    return result;
  }