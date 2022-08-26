'use strict'

async function RegistrarInfoVet(pIdUsuario,pEspecialidad,pInfoVet) {
    let result ={};
      await axios({
        method:'post',
        url: apiUrl + '/RegistrarDatosVet',
        responseType: 'json',
        data: {
          'Identificacion': pIdUsuario,
          'Especialidad': pEspecialidad,
          'InfoVet': pInfoVet,
        }
       })
      .then(function (res) {
      result = res;
      })
      .catch(function (err) {
        console.log(err);
      });

    return result;
  }


  async function EditarInfoVet(pIdUsuario,pEspecialidad,pInfoVet) {
    let result ={};
      await axios({
        method:'put',
        url: apiUrl + '/ModificarInfoVet',
        responseType: 'json',
        data: {
            'Identificacion': pIdUsuario,
            'Especialidad': pEspecialidad,
            'InfoVet': pInfoVet,
        }
      }).then(async(res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
  }


  async function buscaVeterinarioID(pIdentificacion){
    let result = {};
    await  axios.get(apiUrl + '/BuscarVeterinario',{params: {Identificacion: pIdentificacion }} , {
      responseType: 'json'
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
  
   return result;
  }
