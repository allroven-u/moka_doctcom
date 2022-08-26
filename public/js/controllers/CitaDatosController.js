"use strict";

let userSessionCD;

let listaCitas = [];
let listaUsuarios = [];

//variables de lineas factura
let factDescripcion = document.getElementById("txtDiagnostico");
let factCantidad = document.getElementById("txtCantidad");
let factPrecio = document.getElementById("txtPrecio");
let Diagnostico = document.getElementById("txtDescricionR");
let factCita = {};
const btnEnviar = document.getElementById('enviar');
const btnFactura = document.getElementById('factura');
const btnEnviarSV = document.getElementById('btnEnviarVete');
let numFactura = document.getElementById('NumFactura');
const btnAgregarSub = document.getElementById('agregar-subdoc');


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
let queryString, urlParams, _id, usuarioRol, opcionVer, estadoC;
IdentificarAccion();
async function IdentificarAccion() {
  queryString = window.location.search;

  urlParams = new URLSearchParams(queryString);

  _id = urlParams.get("_id");
  usuarioRol = urlParams.get("rol");
  opcionVer = urlParams.get("opcion");
  estadoC = urlParams.get("estado");
  // console.log(opcionVer);
}

usuarioRol = Number(usuarioRol);
const btnDescrip = document.getElementById("boxBtn");
const boxDiagnosticos = document.querySelector(".box-2");
const boxCancelacion = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
const btnsVDE = document.querySelector(".btnsE");
const btnsVDF = document.querySelector(".btnsF");

const boxDescripcion = document.getElementById("boxDescripcion");
const txtDescripcion = document.getElementById("txtDescricionR");
const boxExterna = document.querySelector(".box-externa");
const tableInfoCita = document.querySelector(".box-all");
const boxCalificacion = document.querySelector('.califContainer');
const titleCalf = document.getElementById('titleCalf');
const btnVete = document.querySelector('.button-env');

if (usuarioRol !== 3 && opcionVer === "ver") {
  box4.classList.remove("hidden");
  boxDiagnosticos.classList.remove("hidden");
  boxDescripcion.classList.remove("hidden");
  txtDescripcion.setAttribute("readonly", true);
  tableInfoCita.classList.remove("hidden");
  tableInfoCita.style = "margin-top: 0px";
  boxCalificacion.classList.add('hidden');
  //boxDiagnosticos.classList.add('hidden');
} else if (usuarioRol !== 2 && opcionVer === "compl") {
  btnDescrip.classList.remove("hidden");
  box4.classList.remove("hidden");
  boxDiagnosticos.classList.remove("hidden");
  boxExterna.classList.remove("hidden");
  tableInfoCita.classList.remove("hidden");
  boxDescripcion.classList.remove("hidden");
  btnsVDE.classList.remove('hidden');

} else if (opcionVer === 'final' && estadoC === 'CANCELADA') {
  boxCalificacion.classList.add('hidden');
  boxCancelacion.classList.remove("hidden");
} else if (usuarioRol !== 3 && opcionVer === 'final' && estadoC === "FINALIZADA") {
  titleCalf.textContent = "Calificación Veterinario";
  btnsVDF.classList.remove('hidden');
  box4.classList.remove("hidden");
  boxDiagnosticos.classList.remove("hidden");
  boxDescripcion.classList.remove("hidden");
  txtDescripcion.setAttribute("readonly", true);
  tableInfoCita.classList.remove("hidden");
  tableInfoCita.style = "margin-top: 0px";
  btnVete.classList.remove('hidden');
} else if (usuarioRol === 3 && opcionVer === 'final') {
  boxCalificacion.classList.add('hidden');
  box4.classList.remove("hidden");
  boxDiagnosticos.classList.remove("hidden");
  boxDescripcion.classList.remove("hidden");
  txtDescripcion.setAttribute("readonly", true);
  tableInfoCita.classList.remove("hidden");
  tableInfoCita.style = "margin-top: 0px";
  boxCalificacion.classList.add('hidden');
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

//agrega estrellas
var cantidadS = 0;
for (let i = 0; i < estrellas.length; i++) {
  estrellas[i].addEventListener('click', function () {
    cantidadS = i + 1;
    for (let p = 0; p < cantidadS; p++) {
      estrellas[p].classList.add('star');
    }
    console.log(cantidadS) + 'Estrellas';
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

      if (Factura.FacturaDB != null && Factura.FacturaDB != undefined && Factura.FacturaDB != "") {
        ImprimirDetalleFactura(Factura);
      }


      inputNumReservaDatos.innerHTML =
        "Número de cita: " + listaCitas[i].NumeroCita;
      inputNombreReservaDatos.innerHTML = listaCitas[i].NombreMascota;

      OutnumCita.innerHTML = listaCitas[i].NumeroCita;
      OutVeterinario.innerHTML = veterinario;
      OutfechaCita.innerHTML = listaCitas[i].Fecha;
      Outobservaciones.innerHTML = listaCitas[i].ObservacionesCita;
      OutestadoCita.innerHTML = listaCitas[i].Estado;
      OutMotivoCancelar.innerHTML = listaCitas[i].NotasCancelacion;
      OutNumFactura.innerHTML = listaCitas[i].NumeroFactura;

      btnFactura.setAttribute(
        "href",
        "/public/Factura.html?_id=" + listaCitas[i]._id + "&numFact=" + listaCitas[i].NumeroFactura
      );
      if (listaCitas[i].Estado === "CANCELADA") {
        boxDiagnosticos.classList.add("hidden");
        boxCancelacion.classList.remove("hidden");

      }
    }
  }
}


// Aqui se crean las lineas de la factura
async function agregarLineas() {
  let cita = await getCita(_id);

  if (cita.CitaDB.NumeroFactura == "" || cita.CitaDB.NumeroFactura == undefined || cita.CitaDB.NumeroFactura == null) {
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
      let CitaUpdate = await UpdateCitaFactura(_id, NumNewFactura);


      if (ValidarDatosMedicacionCostos() === true) {
        let linea = await RegistrarLineaFactura(
          fact.facturaDB._id,
          1,
          factDescripcion.value,
          factCantidad.value,
          factPrecio.value
        );
        if (linea != {} && linea.resultado) {
          let fact2 = await getFactura(cita.CitaDB.NumeroFactura);
          ConfirmarDatos(linea.msj);
          ImprimirDetalleFactura(fact2);
          setTimeout(function () {
            location.reload();
          }, 2000);
        } else {
          MostrarError(linea.msj);
        }
        factDescripcion.innerHTML = "";
        factCantidad.innerHTML = "";
        factPrecio.innerHTML = "";


      }

    }



  } else {
    let Factura = await getFactura(cita.CitaDB.NumeroFactura);
    let _idFactura = Factura.FacturaDB._id;
    let ultLinea = Factura.FacturaDB.Lineas;
    ultLinea[Factura.FacturaDB.Lineas.length - 1];

    if (ValidarDatosMedicacionCostos() === true) {

      let linea = await RegistrarLineaFactura(
        _idFactura,
        ultLinea.NumeroLinea + 1,
        factDescripcion.value,
        factCantidad.value,
        factPrecio.value
      );
      if (linea != {} && linea.resultado) {
        ConfirmarDatos(linea.msj);
        setTimeout(function () {
          location.reload();
        }, 2000);
        ImprimirDetalleFactura(Factura);
      } else {
        MostrarError(linea.msj);
      }
      factDescripcion.innerHTML = "";
      factCantidad.innerHTML = "";
      factPrecio.innerHTML = "";

    }

  }
}

function ImprimirDetalleFactura(factura) {


  let Tbody = document.getElementById('TBLienas');

  Tbody.innerHTML = "";

  let cantLinea = factura.FacturaDB.Lineas;
  console.log(cantLinea);


    for (let i = 0; i < cantLinea.length; i++) {
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




//envia estrellas mascota

btnEnviar.addEventListener('click', async function () {
  for (let i = 0; i < listaCitas.length; i++) {
    if (listaCitas[i]._id === _id) {
      let pIdMascota = listaCitas[i].IdMascota;
      if (ValidarDatosCita() === true) {
        let result = await UpdateCitaCalificacion(_id, cantidadS, pIdMascota, Diagnostico.value)
        if (result != {} && result.resultado) {
          ConfirmarDatos(result.msj);
          Diagnostico.value = "";
        } else {
          MostrarError(result.msj);
        };
      }
    }
  }
})

function ValidarDatosCita() {
  if (cantidadS === null || cantidadS === undefined || cantidadS === ' ' || cantidadS === 0) {
    MostrarError('Debe ingresar la calificacion de la mascota');
    return false;
  }
  if (Diagnostico.value === null || Diagnostico.value === "" || Diagnostico.value === undefined) {
    MostrarError('Debe ingresar el diagnostico de la mascota!');
    resaltarInputInvalido("txtDescricionR");
    return false;
  }
  return true;
}




//envia estrellas veterinario

btnEnviarSV.addEventListener('click', async function () {
  for (let i = 0; i < listaCitas.length; i++) {
    if (listaCitas[i]._id === _id) {
      if (ValidarDatosEstrellas() === true) {
        let result = await UpdateCitaCalificacionVeterinario(_id, cantidadS)
        if (result != {} && result.resultado) {
          ConfirmarDatos(result.msj);
        } else {
          MostrarError(result.msj);
        };
      }
    }
  }
})

function ValidarDatosEstrellas() {
  if (cantidadS === null || cantidadS === undefined || cantidadS === ' ' || cantidadS === 0) {
    MostrarError('Debe ingresar la calificacion del Veterinario');
    return false;
  }

  return true;
}
/////////////////



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