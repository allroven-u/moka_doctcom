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

  async function getFactura(pNumeroFactura){
    let result = {};
    await  axios.get(apiUrl + '/BuscarFacturas',{params: {NumeroFactura: pNumeroFactura}} , {
      responseType: 'json'
    }).then((res)=>{
      result = res.data
    }).catch((err)=>{
      console.log(err);
    });
  
   return result;
  };

async function crearFactura(pIdentificacionUsuario,pIdMascota,pNombreMascota,pFecha,pObservacionesFactura) {
    let result = {}
    let ultimaFact = await UltimaFactura();
    

    if(ultimaFact != {} && ultimaFact.resultado == true  ){
        let NumeroFact = 0;

        if(ultimaFact.UltimaFacturaBD == "" || ultimaFact.UltimaFacturaBD == undefined || ultimaFact.UltimaFacturaBD == []){
          NumeroFact = 0;
        }else{
          NumeroFact = ultimaFact.UltimaFacturaBD[0].NumeroFactura ;
        }
        console.log();
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
        result = res.data;
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    }

    return result;
  }

  async function RegistrarLineaFactura(p_id,pNumeroLinea,pDescripcion,pCantidad,pPrecioUnitario) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarLinea',
        responseType: 'json',
        data: {
            '_id': p_id,
            'NumeroLinea': pNumeroLinea,
            'Descripcion': pDescripcion,
            'Cantidad' : pCantidad,
            'PrecioUnitario':pPrecioUnitario
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

