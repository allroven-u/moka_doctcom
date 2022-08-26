"use strict";

let userSessionCD;

let listaCitas = [];
let listaUsuarios = [];

//variables de lineas factura
let factDescripcion = document.getElementById("txtDiagnostico");
let factCantidad = document.getElementById("txtCantidad");
let factPrecio = document.getElementById("txtPrecio");
let factCita = {};
const btnEnviar = document.getElementById('Pagar');

window.addEventListener("load", () => {
  userSessionCD = GetSesion();
  GetlistaUsuarios();
  GetListaCitas();
});

async function GetListaCitas() {
  let result = await getCitasArray();
  if (result != {} && result.resultado == true) {
    listaCitas = result.ListaCitasBD;

    setTimeout(() => {
      llenarCompletarCita();
    }, 50);
  }
}
async function GetlistaUsuarios() {
  let result = await getUsuariosArray();
  if (result != {} && result.resultado == true) {
    listaUsuarios = result.ListaUsuariosBD;
  }
}

///////////Obtener id url/////////////////
let queryString, urlParams, _id, usuarioRol, opcionVer;
IdentificarAccion();
async function IdentificarAccion() {
  queryString = window.location.search;

  urlParams = new URLSearchParams(queryString);

  _id = urlParams.get("_id");
  usuarioRol = urlParams.get("rol");
  opcionVer = urlParams.get("opcion");
  console.log(opcionVer);
}

usuarioRol = Number(usuarioRol);
const btnDescrip = document.getElementById("boxBtn");
const boxDiagnosticos = document.querySelector(".box-2");
const boxCancelacion = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
const btnsVD = document.querySelector(".btns");
const buttonVerCita = document.getElementById("Pagar");

const boxDescripcion = document.getElementById("boxDescripcion");
const txtDescripcion = document.getElementById("txtDescricionR");
const boxExterna = document.querySelector(".box-externa");
const tableInfoCita = document.querySelector(".box-all");

if (usuarioRol !== 3 && opcionVer === "ver") {
  box4.classList.remove("hidden");
  boxDiagnosticos.classList.remove("hidden");
  boxDescripcion.classList.remove("hidden");
  txtDescripcion.setAttribute("readonly", true);
  tableInfoCita.classList.remove("hidden");
  tableInfoCita.style = "margin-top: 0px";
  //boxDiagnosticos.classList.add('hidden');
} else if (usuarioRol !== 2 && opcionVer === "compl") {
  btnDescrip.classList.remove("hidden");
  buttonVerCita.classList.toggle("btn-doctor");
  buttonVerCita.value = "Enviar";
  box4.classList.remove("hidden");
  boxDiagnosticos.classList.remove("hidden");
  boxExterna.classList.remove("hidden");
  tableInfoCita.classList.remove("hidden");
  boxDescripcion.classList.remove("hidden");
}

let inputNumReservaDatos = document.getElementById("numCitaDatos");
let inputNombreReservaDatos = document.getElementById("txtNombreMascota");
let OutVeterinario = document.getElementById("Vetrinario");
let OutnumCita = document.getElementById("numCita");
let OutfechaCita = document.getElementById("fechaCita");
let Outobservaciones = document.getElementById("observaciones");
let OutestadoCita = document.getElementById("estadoCita");
let OutMotivoCancelar = document.getElementById("txtMotivoCancelar");
let OutNumFactura = document.getElementById("NumFactura");
const estrellas = document.querySelectorAll('.fa-star');





  var cantidadS = 0;
  for(let i = 0; i < estrellas.length; i++){
    estrellas[i].addEventListener('click', function(){
      cantidadS = i + 1;
      for(let p = 0; p  < cantidadS; p++){
        estrellas[p].classList.add('star');
      }
      console.log(cantidadS );
      return cantidadS;
    })
  }





async function llenarCompletarCita() {
  let veterinario;

  for (let i = 0; i < listaCitas.length; i++) {
    if (listaCitas[i]._id == _id) {
      factCita = listaCitas[i];
      for (let j = 0; j < listaUsuarios.length; j++) {
        if (
          listaUsuarios[j].Identificacion ==
          listaCitas[i].IdentificacionVeterinario
        ) {
          veterinario = listaUsuarios[j].Nombre;
        }
      }
 
      let Factura = await getFactura(factCita.NumeroFactura);
      console.log(Factura)
      if (Factura.FacturaDB != null && Factura.FacturaDB != undefined && Factura.FacturaDB !=""){
           ImprimirDetalleFactura(Factura); 
      }


      inputNumReservaDatos.innerHTML =
        "Cita Numero: " + listaCitas[i].NumeroCita;
      inputNombreReservaDatos.innerHTML = listaCitas[i].NombreMascota;

      OutnumCita.innerHTML = listaCitas[i].NumeroCita;
      OutVeterinario.innerHTML = veterinario;
      OutfechaCita.innerHTML = listaCitas[i].Fecha;
      Outobservaciones.innerHTML = listaCitas[i].ObservacionesCita;
      OutestadoCita.innerHTML = listaCitas[i].Estado;
      OutMotivoCancelar.innerHTML = listaCitas[i].NotasCancelacion;
      OutNumFactura.innerHTML = listaCitas[i].NumeroFactura;
      if (listaCitas[i].Estado === "CANCELADA") {
        boxDiagnosticos.classList.add("hidden");
        btnsVD.style = "display: none;";
        boxCancelacion.classList.remove("hidden");
      }
    }
  }
}


// Aqui se crean las lineas de la factura
async function agregarLineas() {
  let cita = await getCita(_id);

  if (cita.CitaDB.NumeroFactura == "" ||cita.CitaDB.NumeroFactura == undefined ||cita.CitaDB.NumeroFactura == null
  ) {
    // Aca se crea la factura en estado creado si es que no esta creada y si ya esta creada se agregan las lineas respectivas
    let fact = await crearFactura(
      factCita.IdentificacionUsuario,
      factCita.IdMascota,
      factCita.NombreMascota,
      new Date().toISOString(),
      ""
    );
    if (fact.resultado == true) {
      let NumNewFactura = fact.facturaDB.NumeroFactura;
      //   console.log(NumNewFactura);
      let CitaUpdate = await UpdateCitaFactura(_id, NumNewFactura);
      console.log(CitaUpdate);
      let linea = await RegistrarLineaFactura(
        fact.facturaDB._id,
        1,
        factDescripcion.value,
        factCantidad.value,
        factPrecio.value
      );
      factDescripcion.innerHTML = "";
      factCantidad.innerHTML = "";
      factPrecio.innerHTML = "";

      ImprimirDetalleFactura(fact.facturaDB);

    } else {
      
    }
  }else{
    let Factura = await getFactura(cita.CitaDB.NumeroFactura);
      let _idFactura = Factura.FacturaDB._id;
      let ultLinea = Factura.FacturaDB.Lineas[Factura.FacturaDB.Lineas.length - 1];
      console.log(ultLinea.NumeroLinea + 1);
      let linea = await RegistrarLineaFactura(
        _idFactura,
        ultLinea.NumeroLinea + 1,
        factDescripcion.value,
        factCantidad.value,
        factPrecio.value
      );
      factDescripcion.innerHTML = "";
      factCantidad.innerHTML = "";
      factPrecio.innerHTML = "";

      ImprimirDetalleFactura(Factura);
  } 
}


function ImprimirDetalleFactura(factura) {


    let Tbody = document.getElementById('TBLienas');

    Tbody.innerHTML = "";

    let cantLinea = factura.FacturaDB.Lineas.length;

  
      for (let i = 0; i < cantLinea; i++) {

        let fila = Tbody.insertRow();
        let linea = factura.FacturaDB.Lineas[i];

        let celdaDescripcion = fila.insertCell();
        celdaDescripcion.innerHTML = linea.Descripcion;
        let celdaCantidad = fila.insertCell();
        celdaCantidad.innerHTML = linea.Cantidad;
        let celdaPrecio = fila.insertCell();
        celdaPrecio.innerHTML = linea.PrecioUnitario;
    }

}

btnEnviar.addEventListener('click', async function(){
  for (let i = 0; i < listaCitas.length; i++) {
    if (listaCitas[i]._id === _id) {
      if (ValidarDatosCita() === true) {
        let result = await  UpdateCitaCalificacion(_id, cantidadS) 
        if (result != {} && result.resultado) {
            ConfirmarDatos(result.msj);
        }else{
            MostrarError(result.msj);
        };
    }
    }
  }
   

})


function ValidarDatosCita(){
  if(cantidadS === null || cantidadS === undefined || cantidadS === ' '){
    MostrarError('Debe ingresar la calificacion de la mascota');
    return false;
  }
  return true;
}


