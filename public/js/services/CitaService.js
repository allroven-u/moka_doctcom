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


async function crearCita(pIdUsuario,pIdMascota,pMascota,pFecha,pIdVeterinario,pDescripcionCita) {
    let result ={};
    let ultimaCita = await UltimaCita();

    if(ultimaCita != {} && ultimaCita.resultado == true){
      let NumeroCita=ultimaCita.ListaCitasBD
      
      await axios({
        method:'post',
        url: apiUrl + '/RegistrarCita',
        responseType: 'json',
        data: {
          'NumeroCita':NumeroCita[0].NumeroCita + 1,
          'IdentificacionUsuario':pIdUsuario,
          'IdMascota':pIdMascota,
          'NombreMascota': pMascota,
          'FechaHora': pFecha,
          'Calificacion': 0,
          'Estado': 'AGENDADA',
          'IdentificacionVeterinario':pIdVeterinario,
          'ObservacionesVeterinario':'',
          'ObservacionesCita': pDescripcionCita,
          'NotasCancelacion':'',
          'Fecha':pFecha
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
  async function CancelarCita(pNumCita,pEstado, pObsCancelar) {
    let result ={};
      await axios({
        method:'put',
        url: apiUrl + '/ModificarCita',
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