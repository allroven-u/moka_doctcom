"use strict";


// let reservaArray = []; // arreglo de usuarios

// // Esta funcion carga un archivo tipo json y lo carga a un array utilizando un promesa de js
// function cargaJsonReservas() {

//   fetch("/public/assets/data/infoReservaciones.json")
//     .then((response) => response.json())
//     .then((response) => {
//         reservaArray = response;
//         console.log(reservaArray);
//     });
    
// //   return reservaArray;
// };


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

function FiltrarCitas(pFecha1,pFecha2,pVeterinarioID,pNombreMascota,pDuenio){

  for (let i = 0; i < reservaArray.length; i++) {
    const cita = reservaArray[i];
    
  }

  return reservaArray;
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


  async function crearReserva(pIdUsuario,pIdMascota,pMascota,pFechaEnt,pFechaSal,pDescripcionReserva) {
    let result ={};
    let ultimaReserva = await UltimaReserva();

    if(ultimaReserva != {} && ultimaReserva.resultado == true){
      let NumeroReserva=ultimaReserva.ListaReservasBD
      
      await axios({
        method:'post',
        url: apiUrl + '/RegistrarReservacion',
        responseType: 'json',
        data: {
          'NumeroReservacion': NumeroReserva[0].NumeroReservacion + 1,
          'IdentificacionUsuario':pIdUsuario,
          'IdMascota': pIdMascota,
          'NombreMascota': pMascota,
          'FechaHoraIngreso': pFechaEnt,
          'FechaHoraSalida': pFechaSal,
          'Calificacion':0,
          'Estado': 'AGENDADA',
          'ObservacionesReservacion':pDescripcionReserva,
          'NotasCancelacion' : ''
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
