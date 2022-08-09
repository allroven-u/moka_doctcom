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

function FiltrarCitas(pFecha1,pFecha2,pVeterinarioID,pNombreMascota,pDuenio){

  for (let i = 0; i < citasArray.length; i++) {
    const cita = citasArray[i];
    
  }

  return citasArray;
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
    console.log(pMascota)
    let ultimaCita = await UltimaCita();

    if(ultimaCita != {} && ultimaCita.resultado == true){
      axios.post('/RegistrarCita', {
        responseType: 'json',
        data: {
          NumeroCita:ultimaCita.ListaCitasBD.NumeroCita + 1,
          IdentificacionUsuario:pIdUsuario,
          IdMascota:pIdMascota,
          NombreMascota: pMascota,
          FechaHora: pFecha,
          Calificacion: 0,
          Estado: 'AGENDADA',
          IdentificacionVeterinario:pIdVeterinario,
          ObservacionesVeterinario:'',
          ObservacionesCita: pDescripcionCita,
          NotasCancelacion:''
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
