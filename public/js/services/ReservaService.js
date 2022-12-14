"use strict";

async function getReservasArray(){
  let result = {};
  await  axios.get(apiUrl + '/ListarReservaciones', {
    responseType: 'json',
  }).then((res)=>{
    result = res.data
  }).catch((err)=>{
    console.log(err);
  });

 return result;
};

async function getReservasUsuario(pIdentificacionUsuario){
  let result = {};
  await  axios.get(apiUrl + '/MiListarReservaciones',{params: {IdentificacionUsuario: pIdentificacionUsuario }} , {
    responseType: 'json'
  }).then((res)=>{
    result = res.data
  }).catch((err)=>{
    console.log(err);
  });

 return result;
  };

  async function getReserva(p_id){
    let result = {};
    await  axios.get(apiUrl + '/BuscarReservaPorId',{params: {_id: p_id}} , {
      responseType: 'json'
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
  
   return result;
  };

// function FiltrarCitas(pFecha1,pFecha2,pVeterinarioID,pNombreMascota,pDuenio){

//   for (let i = 0; i < reservaArray.length; i++) {
//     const cita = reservaArray[i];
    
//   }

//   return reservaArray;
//   };

  async function FiltrarReservas(pFecha1,pFecha2,pEstado,pIdentificacionUsuario,pRol){
    console.log(pRol);
    let result = {};
   if(pRol == 2){
    await  axios.get(apiUrl + '/FiltarReservaByusuario',{params: { fechaInicio: pFecha1 ,fechaFinal: pFecha2,Estado:pEstado,
      IdentificacionUsuario:pIdentificacionUsuario}} , {
      responseType: 'json'
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
   }else{
    await  axios.get(apiUrl + '/FiltarReserva',{params: { fechaInicio: pFecha1 ,fechaFinal: pFecha2,Estado:pEstado}} , {
      responseType: 'json'
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
   }
   return result;
    };
  
    


  async function UltimaReserva(){
    let result = {};
    await  axios.get(apiUrl + '/UltimaReserva', {
      responseType: 'json',
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });

  return result;
  }


  async function crearReserva(pIdUsuario,pIdMascota,pMascota,pFechaEnt,pFechaSal,pDescripcionReserva,pFechaCreacion,pUsuarioCreacion) {
    let result ={};
    let NumeroReserva = 0;
    let ultimaReserva = await UltimaReserva();

    if(ultimaReserva != {} && ultimaReserva.resultado == true){

      if(ultimaReserva.ListaReservasBD == "" || ultimaReserva.ListaReservasBD == undefined || ultimaReserva.ListaReservasBD == []){
        NumeroReserva = 0;
      }else{
        NumeroReserva = ultimaReserva.ListaReservasBD[0].NumeroReservacion ;
      }

      await axios({
        method:'post',
        url: apiUrl + '/RegistrarReservacion',
        responseType: 'json',
        data: {
          'NumeroReservacion': NumeroReserva + 1,
          'IdentificacionUsuario':pIdUsuario,
          'IdMascota': pIdMascota,
          'NombreMascota': pMascota,
          'FechaHoraIngreso': pFechaEnt,
          'FechaHoraSalida': pFechaSal,
          'Calificacion':0,
          'Estado': 'AGENDADA',
          'ObservacionesReservacion':pDescripcionReserva,
          'NotasCancelacion' : '',
          'NumeroFactura':'',
          'FechaCreacion':pFechaCreacion,
          'UsuarioCreacion':pUsuarioCreacion
        }

       })
      .then(function (res) {
        result = res;
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    }

    return result;
  }


  async function CancelarReservacion(pNumReserva,pEstado, pObsCancelar) {
    let result ={};
      await axios({
        method:'put',
        url: apiUrl + '/ModificarReservacion',
        responseType: 'json',
        data: {
          'NumeroReservacion': pNumReserva,
          'Estado':pEstado,
          'NotasCancelacion':pObsCancelar

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


  async function UpdateReservaCalificacion(pNumR, pCalificacion) {
    let result ={}; 
      await axios({
        method:'put',
        url: apiUrl + '/ModificarReservacion',
        responseType: 'json',
        data: {
          'NumeroReservacion': pNumR,  
          'Calificacion':pCalificacion 
        }

       })
      .then(function (res) {
        result = res.data;
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    return result;
  }

  async function UpdateReservaFactura(p_id,pNumeroFactura, pCalificacion) {
    let result ={}; 
      await axios({
        method:'put',
        url: apiUrl + '/ModificarCita',
        responseType: 'json',
        data: {
          '_id': p_id,
          'NumeroFactura':pNumeroFactura,     
          'Calificacion':pCalificacion 
        }

       })
      .then(function (res) {
        result = res.data;
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    return result;
  }