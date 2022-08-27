'use strict'
let listaReservas = [];


let factDescripcion = document.getElementById("txtDescripcionS");
let factCantidad = document.getElementById("txtCantidad");
let factPrecio = document.getElementById("txtPrecio");
const btnEnviar = document.getElementById('enviar');
const btnFactura = document.getElementById('factura');
const btnAgregarSub = document.getElementById('agregar-subdoc');


window.addEventListener('load', () =>{

    GetListaReservas();
});

async function GetListaReservas() {

    let result = await getReservasArray();
    if( result != {} && result.resultado == true){
        listaReservas=result.ListaReservasBD;
        llenarCompletarReserva();

    }
}

///////////Obtener id url/////////////////
let queryString, urlParams, _id, usuarioRol, opcionVer, estadoR;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    usuarioRol = urlParams.get('rol');
    opcionVer = urlParams.get('opcion');
    estadoR = urlParams.get("estado");
}

usuarioRol = Number(usuarioRol);

const btnDescrip = document.getElementById("boxBtn");
const boxDiagnosticos = document.querySelector(".box-2");
const boxCancelacion = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
const btnsVDE = document.querySelector(".btnsE");
const btnsVDF = document.querySelector(".btnsF");

const boxDescripcion = document.getElementById("boxDescripcion");
const txtDescripcion = document.getElementById("txtDescricionO");
const boxExterna = document.querySelector(".box-externa");
const tableInfoCita = document.querySelector(".box-all");
const boxCalificacion = document.querySelector('.califContainer');
const titleCalf = document.getElementById('titleCalf');

if (usuarioRol !== 3 && opcionVer === 'ver') {
    box4.classList.remove("hidden");
    boxDiagnosticos.classList.remove("hidden");
    boxDescripcion.classList.remove("hidden");
    txtDescripcion.setAttribute("readonly", true);
    tableInfoCita.classList.remove("hidden");
    tableInfoCita.style = "margin-top: 0px";
    boxCalificacion.classList.add('hidden');
    //boxDiagnosticos.classList.add('hidden');
}else if(usuarioRol !== 2 && opcionVer === 'compl'){
    btnDescrip.classList.remove("hidden");
    box4.classList.remove("hidden");
    // boxDiagnosticos.classList.remove("hidden");
    boxExterna.classList.remove("hidden");
    tableInfoCita.classList.remove("hidden");
    // boxDescripcion.classList.remove("hidden");
    btnsVDE.classList.remove('hidden');
}else if(opcionVer === 'final' &&  estadoR === 'CANCELADA'){
    boxCalificacion.classList.add('hidden');
    boxCancelacion.classList.remove("hidden");
 }else if(usuarioRol !== 3 && opcionVer === 'final' && estadoR === "FINALIZADA"){
   titleCalf.textContent = "Calificación veterinario";
   btnsVDF.classList.remove('hidden');
   box4.classList.remove("hidden");
   boxDiagnosticos.classList.remove("hidden");
  //  boxDescripcion.classList.remove("hidden");
   txtDescripcion.setAttribute("readonly", true);
   tableInfoCita.classList.remove("hidden");
   tableInfoCita.style = "margin-top: 0px";
   boxCalificacion.classList.add('hidden')
 }else if(usuarioRol === 3 && opcionVer === 'final'){
   boxCalificacion.classList.add('hidden');
   box4.classList.remove("hidden");
   boxDiagnosticos.classList.remove("hidden");
  //  boxDescripcion.classList.remove("hidden");
   txtDescripcion.setAttribute("readonly", true);
   tableInfoCita.classList.remove("hidden");
   tableInfoCita.style = "margin-top: 0px";
   boxCalificacion.classList.add('hidden');
 }

let inputNumReservaDatos = document.getElementById('numReservaDatos');
let inputNombreReservaDatos = document.getElementById('txtNombreMascota');
let OutnumReserva = document.getElementById('numReserva');
let OutfechaCitaIn = document.getElementById('fechaCitaIn');
let OutfechaCitaOut = document.getElementById('fechaCitaOut');
let Outobservaciones = document.getElementById('observaciones');
let OutestadoReserva = document.getElementById('estadoReserva');
let OutMotivoCancelar = document.getElementById('txtMotivoCancelar');
const estrellas = document.querySelectorAll('.fa-star');

//agrega estrellas
  var cantidadS = 0;
  for(let i = 0; i < estrellas.length; i++){
    estrellas[i].addEventListener('click', function(){
      cantidadS = i + 1;
      for(let p = 0; p  < cantidadS; p++){
        estrellas[p].classList.add('star');
      }
      console.log(cantidadS);
      return cantidadS;
    })
  }

function llenarCompletarReserva(){
    for (let i = 0; i < listaReservas.length; i++) {
        if(listaReservas[i]._id == _id){
            
            inputNumReservaDatos.innerHTML= 'Número de reservación: '+listaReservas[i].NumeroReservacion;
            inputNombreReservaDatos.innerHTML=listaReservas[i].NombreMascota;

            OutnumReserva.innerHTML=listaReservas[i].NumeroReservacion;
            OutfechaCitaIn.innerHTML=listaReservas[i].
            FechaHoraIngreso;
            OutfechaCitaOut.innerHTML=listaReservas[i].
            FechaHoraSalida;
            Outobservaciones.innerHTML=listaReservas[i].
            ObservacionesReservacion;
            OutestadoReserva.innerHTML=listaReservas[i].
            Estado;
            OutMotivoCancelar.innerHTML = listaReservas[i].NotasCancelacion;

            if(listaReservas[i].Estado === 'CANCELADA'){
                boxDiagnosticos.classList.add('hidden');
                boxCancelacion.classList.remove('hidden');
            }
        }
    }    
}

//envia estrellas mascota

btnEnviar.addEventListener('click', async function(){
    for (let i = 0; i < listaReservas.length; i++) {
      if (listaReservas[i]._id === _id) {
        let pNumR = listaReservas[i].NumeroReservacion;
        if (ValidarDatosReserva() === true) {
          let result = await  UpdateReservaCalificacion(pNumR, cantidadS) 
          if (result != {} && result.resultado) {
              ConfirmarDatos(result.msj);
          }else{
              MostrarError(result.msj);
          };
      }
      }
    }
  })
  function ValidarDatosReserva(){
    if(cantidadS === null || cantidadS === undefined || cantidadS === ' ' || cantidadS === 0){
      MostrarError('¡Debe ingresar la calificación de la mascota!');
      return false;
    }
    if(txtDescripcion.value === null || txtDescripcion.value === "" || txtDescripcion.value === undefined){
        MostrarError('Debe ingresar las observaciones!');
        resaltarInputInvalido("txtDescricionO");
        return false;
    }
    return true;
  }
/////////////////////


  function ValidarReservaServicios(){
    if(factDescripcion.value === null || factDescripcion.value === "" || factDescripcion.value === undefined){
        MostrarError('Debe ingresar la descripción!');
        resaltarInputInvalido("txtDescripcionS");
        return false;
    }
    if(factCantidad.value === null || factCantidad.value === "" || factCantidad.value === undefined){
        MostrarError('Debe ingresar la cantidad!');
        resaltarInputInvalido("txtCantidad");
        return false;
    }else if(Number(factCantidad.value) <= 0){
        MostrarError('Debe ingresar una cantidad mayor a 0!');
        resaltarInputInvalido("txtCantidad");
        return false;
    }
    if(factPrecio.value === null || factPrecio.value === "" || factPrecio.value === undefined){
        MostrarError('Debe ingresar el precio!');
        resaltarInputInvalidoj("txtPrecio");
        return false;
    }else if(Number(factPrecio.value) <= 0){
        MostrarError('Debe ingresar un precio mayor a 0!');
        resaltarInputInvalidoj("txtPrecio");
        return false;
    }
    return true;
  }
  

  function ValidarDatosMedicacionCostos() {
    let sfactDescripcion = factDescripcion.value;
    let sfactCantidad = factCantidad.value;
    let sfactPrecio = factPrecio.value;
  
  
    if (sfactDescripcion == null || sfactDescripcion == undefined || sfactDescripcion == "") {
      resaltarInputInvalido("txtDiagnostico");
      MostrarError("¡La descripción es requerida!");
      return false;
    }
  
    if (sfactCantidad == null || sfactCantidad == undefined || sfactCantidad == "") {
      resaltarInputInvalido("txtCantidad");
      MostrarError("¡La cantidad es requerida!");
      return false;
    } else if (Number(sfactCantidad) <= 0) {
      MostrarError('¡Debe ingresar una cantidad mayor a 0!');
      resaltarInputInvalido("txtCantidad");
      return false;
    }
  
    if (sfactPrecio == null || sfactPrecio == undefined || sfactPrecio == "") {
      resaltarInputInvalido("txtPrecio");
      MostrarError("¡El precio es requerido!");
      return false;
    } else if (Number(sfactPrecio) <= 0) {
      MostrarError('¡Debe ingresar un precio mayor a 0!');
      resaltarInputInvalido("txtPrecio");
      return false;
    }
    return true;
  }


async function agregarLineas() {
  let reserva = await getReserva(_id);

   if (ValidarDatosMedicacionCostos() === true) {

  if (reserva.ReservaDB.NumeroFactura == "" || reserva.ReservaDB.NumeroFactura == undefined || reserva.ReservaDB.NumeroFactura == null) {
    // Aca se crea la factura en estado creado si es que no esta creada y si ya esta creada se agregan las lineas respectivas
   

    let fact = await crearFactura(
      reserva.ReservaDB.IdentificacionUsuario,
      reserva.ReservaDB.IdMascota,
      reserva.ReservaDB.NombreMascota,
      new Date().toISOString(),
      ""
    );
   
    if (fact.resultado == true) {
      let NumNewFactura = fact.facturaDB.NumeroFactura;
       let ReservaUpdate = await UpdateReservaFactura(_id, NumNewFactura,3);
     
        let linea = await RegistrarLineaFactura(
          fact.facturaDB._id,
          1,
          factDescripcion.value,
          factCantidad.value,
          factPrecio.value
        );
        if (linea != {} && linea.resultado) {
 
          ConfirmarDatos(linea.msj);
        } else {
          MostrarError(linea.msj);
        }
        
        setTimeout(function () {
          location.reload();
        }, 2000);
        factDescripcion.innerHTML = "";
        factCantidad.innerHTML = "";
        factPrecio.innerHTML = "";

    }
  } else {
    // let Factura = await getFactura(cita.CitaDB.NumeroFactura);
    // let _idFactura = Factura.FacturaDB._id;
    // let ultLinea = Factura.FacturaDB.Lineas;
    // ultLinea[Factura.FacturaDB.Lineas.length - 1];

    //   let linea = await RegistrarLineaFactura(
    //     _idFactura,
    //     ultLinea.NumeroLinea + 1,
    //     factDescripcion.value,
    //     factCantidad.value,
    //     factPrecio.value
    //   );
    //   if (linea != {} && linea.resultado) {
    //     ConfirmarDatos(linea.msj);
    //     setTimeout(function () {
    //       location.reload();
    //     }, 2000);

    //   } else {
    //     MostrarError(linea.msj);
    //   }
    //   factDescripcion.innerHTML = "";
    //   factCantidad.innerHTML = "";
    //   factPrecio.innerHTML = "";

  }
}
}

  function ImprimirDetalleFactura(pLineas) {

    let Tbody = document.getElementById('TBLienas');
    Tbody.innerHTML = "";
    console.log(pLineas);
    let cantLinea = pLineas;
  
      for (let i = 0; i < cantLinea.length; i++) {
        let fila = Tbody.insertRow();
        let linea = cantLinea[i];
        let celdaDescripcion = fila.insertCell();
        celdaDescripcion.innerHTML = linea.Descripcion;
        let celdaCantidad = fila.insertCell();
        celdaCantidad.innerHTML = linea.Cantidad;
        let celdaPrecio = fila.insertCell();
        celdaPrecio.innerHTML = linea.PrecioUnitario;
  
  
     
      }
   
  }