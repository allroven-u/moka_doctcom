"use strict";

let facturasArray = []; // arreglo de usuarios

// Esta funcion carga un archivo tipo json y lo carga a un array utilizando un promesa de js
function cargaJson() {
  console.log("Empezando carga de facturas....");

  fetch("/public/assets/data/infoFacturas.json")
    .then((response) => response.json())
    .then((response) => {
        facturasArray = response;
      console.log(usuariosfacturasArrayArray);
    });
  return facturasArray;
}

function getFacturas(){
    return facturasArray;
}

//Esta funcion busca un objeto dentro del arreglo de facturas segun el campo de id factura y lo devuelve en formato object.
function buscaFacturaNumero(pNumFactura) {
    let result = null;
    for (let i = 0; i < facturasArray.length; i++) {
      if (facturasArray[i].NumeroFactura == pNumFactura) {
        result = facturasArray[i];
      }
    }
    return result;
  }

  //Esta funcion busca un las facturas dentro del arreglo de facturas segun el cliente y lo devuelve un arreglo con todas las facturas del cliente.
function buscaFacturaCliente(pClienteID) {
    let result = [];
    for (let i = 0; i < facturasArray.length; i++) {
      if (facturasArray[i].IdentificacionUsuario === pClienteID) {
        result = result.push(facturasArray[i]);
      }
    }
    return result;
  }
