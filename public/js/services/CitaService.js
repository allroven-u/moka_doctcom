"use strict";


async function getCitasArray(){
  let result = {};
  await  axios.get(apiUrl + '/ListarCitas', {
    responseType: 'json',
  }).then((res)=>{
    result = res.data
  }).catch((err)=>{
    console.log(err);
  });

 return result;
};

async function FiltrarCitas(pFecha1,pFecha2){
  let result = {};
 
  await  axios.get(apiUrl + '/FiltarCita',{params: { fechaInicio: pFecha1 ,fechaFinal: pFecha2}} , {
    responseType: 'json'
  }).then((res)=>{
    result = res.data
  }).catch((err)=>{
    console.log(err);
  });

 return result;
  };

  async function getCitasUsuario(pIdentificacionUsuario){
    let result = {};
    await  axios.get(apiUrl + '/MiListarCitas',{params: {IdentificacionUsuario: pIdentificacionUsuario }} , {
      responseType: 'json'
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
  
   return result;
    };

    async function getCitasVeterinario(pIdentificacionVeterinario){
      let result = {};
      await  axios.get(apiUrl + '/ListarCitasVet',{params: {IdentificacionVeterinario: pIdentificacionVeterinario }} , {
        responseType: 'json'
      }).then((res)=>{
        result = res.data
      }).catch((err)=>{
        console.log(err);
      });
    
     return result;
      };

      

      async function getCita(p_id){
        let result = {};
        await  axios.get(apiUrl + '/BuscarCitaPorId',{params: {_id: p_id}} , {
          responseType: 'json'
        }).then((res)=>{
          result = res.data
        }).catch((err)=>{
          console.log(err);
        });
      
       return result;
      };

async function UltimaCita(){
    let result = {};
    await  axios.get(apiUrl + '/UltimaCita', {
      responseType: 'json',
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });

  return result;
  }


async function crearCita(pIdUsuario,pIdMascota,pMascota,pFecha,pIdVeterinario,pDescripcionCita,pFechaCreacion,pUsuarioCreacion) {
    let result ={};
    let ultimaCita = await UltimaCita();

    if(ultimaCita != {} && ultimaCita.resultado == true){
      let NumeroCita = 0;

      if(ultimaCita.ListaCitasBD == "" || ultimaCita.ListaCitasBD == undefined || ultimaCita.ListaCitasBD == []){
        NumeroCita = 0;
      }else{
        NumeroCita = ultimaCita.ListaCitasBD[0].NumeroCita ;
      }
    
      await axios({
        method:'post',
        url: apiUrl + '/RegistrarCita',
        responseType: 'json',
        data: {
          'NumeroCita':NumeroCita + 1,
          'IdentificacionUsuario':pIdUsuario,
          'IdMascota':pIdMascota,
          'NombreMascota': pMascota,
          'Fecha': pFecha,
          'Calificacion': 0,
          'Estado': 'AGENDADA',
          'IdentificacionVeterinario':pIdVeterinario,
          'ObservacionesVeterinario':'',
          'ObservacionesCita': pDescripcionCita,
          'NotasCancelacion':'',
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

  async function CancelarCita(pNumCita, pEstado, pObsCancelar) {
    let result ={};
      await axios({
        method:'put',
        url: apiUrl + '/CancelarCita',
        responseType: 'json',
        data: {
          'NumeroCita': pNumCita,
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

  async function UpdateCitaFactura(p_id,pNumeroFactura, pCalificacion) {
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

  
  async function UpdateCitaCalificacion(p_id, pCalificacion,pIdMascota,pObservacionesVeterinario) {
    let result ={}; 
      await axios({
        method:'put',
        url: apiUrl + '/ModificarCita',
        responseType: 'json',
        data: {
          '_id': p_id,  
          'Calificacion':pCalificacion,
          'ObservacionesVeterinario': pObservacionesVeterinario
        }

       })
      .then(function (res) {
        result = res.data;
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });


     if(result.resultado == true){
         let promedio = await PromedioMascota(pIdMascota);
          console.log( 'Promedio' + promedio.info[0].Promedio);
         let Calificacion = Math.round(promedio.info[0].Promedio);
         EditarCalificacionPromMascota(pIdMascota,Calificacion);
       }

    return result;
  }

  async function UpdateCitaCalificacionVeterinario(p_id, pCalificacionVete) {
    let result ={}; 
      await axios({
        method:'put',
        url: apiUrl + '/ModificarCita',
        responseType: 'json',
        data: {
          '_id': p_id,  
          'CalificacionVeterinario':pCalificacionVete 
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


  async function PromedioMascota(pIdMascota){
    let result = {};
   
    await  axios.get(apiUrl + '/AvgCalificacionMascota',{params: { IdMascota: pIdMascota}} , {
      responseType: 'json'
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
  
   return result;
    };

  


  