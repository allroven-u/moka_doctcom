"use strict";
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

  async function buscaUsuarioID(pIdentificacion){
    let result = {};
    await  axios.get(apiUrl + '/BuscarUsuario',{params: {Identificacion: pIdentificacion }} , {
      responseType: 'json'
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
  
   return result;
  }


  async function RegistrarUsuario(pNombre,pApellido,pIdUsuario,pEmail, pPhone,pPassword,pDireccion,pFoto,pFecha) {
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
          'Telefono': pPhone,
          'Contrasenia': pPassword,
          'Direccion': pDireccion,
          'CalificacionPromedio': 0,
          'Foto': pFoto,
          'Activo': 1,
          'Rol': 2,
          'Fecha':pFecha
        }

       })
      .then(function (res) {
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
      result = res;
      })
      .catch(function (err) {
        console.log(err);
      });

    return result;
  }

  async function EditarUsuario(pID,pNombre,pApellido,pIdUsuario,pEmail,pPhone,pDireccion,pFoto,pRol,pEstado) {
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
          'Telefono': pPhone,
          'Direccion': pDireccion,
          'Foto': pFoto,
          'Activo': pEstado,
          'Rol':pRol
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


  async function RegistrarTarjetaNueva(p_id,pNombre,pNumeroTarjeta,pMesVencimiento,pAnioVencimiento,pCVV) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarTarjeta',
        responseType: 'json',
        data: {
            '_id': p_id,
            'NombreTarjetahabiente': pNombre,
            'NumeroTarjeta': pNumeroTarjeta,
            'MesVencimiento' : pMesVencimiento,
            'AnioVencimiento':pAnioVencimiento,
            'CVV': pCVV,
            'Activo':1,
            'Principal':1,
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

async function EliminarTarjeta(p_idUsuario, p_idTarjeta) {
  let result = {};
  await axios({
      method: 'post',
      url: apiUrl + '/EliminarTarjetaPersona',
      responseType: 'json',
      data: {
          '_idUsuario': p_idUsuario,
          '_idTarjeta': p_idTarjeta
      }
  }).then((res) => {
      result = res.data;
  }).catch((err) => {
      console.log(err);
  });
  return result;
}