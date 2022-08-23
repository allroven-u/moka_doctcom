"use strict";

async function getMascotasArray(idCliente){
  let result = {};
  await  axios.get(apiUrl + '/BuscarMascotaIDDuenio', {
    responseType: 'json',
    params: {
      IdentificacionDuenio: idCliente,
    }
  }).then((res)=>{
    result = res.data;
  }).catch((err)=>{
    console.log(err);
  });
  return result;
}

async function RegistrarMascota(pIdUsuario,pMascota,pDireccion,platitud,plongitud,pFoto) {
  let result ={};
    await axios({
      method:'post',
      url: apiUrl + '/RegistrarMascota',
      responseType: 'json',
      data: {
        'IdentificacionDuenio': pIdUsuario,
        'NombreMascota': pMascota,
        'Direccion': pDireccion,
        CalificacionPromedio: 0,
        Activo: 1,
        Estado: "Normal",
        Latitud: platitud,
        Longitud:plongitud,
        Foto: pFoto,
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

async function EditarDatosMascota(pId, pDireccion, pEstado, pFoto) {
  let result = {};
    await axios({
      method:'put',
      url: apiUrl + '/ModificarMascota',
      responseType: 'json',
      data: {
        '_id': pId,
        'Direccion': pDireccion,
        'Estado': pEstado,
        'Foto': pFoto,
      }
    }).then((res) => {
      result = res.data;
  }).catch((err) => {
      console.log(err);
  });
  return result;
}

async function DesactivarMascota(pId){
  let result = {};
  await axios({
    method:'put',
    url: apiUrl + '/DesactivarMascota',
    responseType: 'json',
    data: {
      '_id': pId
    }
  }).then((res) => {
    result = res.data;
}).catch((err) => {
    console.log(err);
});
return result;
}


