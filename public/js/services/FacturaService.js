 "use strict";

 async function getFacturasArray(){
    let result = {};
    await  axios.get(apiUrl + '/ListarFacturas', {
      responseType: 'json',
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
  
   return result;
  };


  async function UltimaFactura(){
    let result = {};
    await  axios.get(apiUrl + '/UltimaFactura', {
      responseType: 'json',
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });

  return result;
  }

async function crearFactura(pIdentificacionUsuario,pIdMascota,pNombreMascota,pFecha,pObservacionesFactura) {
    let result = await UltimaFactura();
    let NumeroFact = 0;

    if(result != {} && result.resultado == true  ){
          console.log(result);

        NumeroFact = result.UltimaFacturaBD[0].NumeroFactura;
        console.log(NumeroFact);

      await axios({
        method:'post',
        url: apiUrl + '/RegistrarFactura',
        responseType: 'json',
        data: {
          'NumeroFactura': NumeroFact + 1,
          'IdentificacionUsuario':pIdentificacionUsuario,
          'IdMascota':pIdMascota,
          'NombreMascota': pNombreMascota,
          'Fecha': pFecha,
          'Estado': 'CREADO',
          'ObservacionesFactura':pObservacionesFactura
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
  
