'use strict';

let userSessionC;
let listaMascotas = [];
let listaUsuarios = [];
let listaCitas = [];

let botonFiltrar = document.getElementById('btnFiltroCita');
let fechaInicio = document.getElementById('DateFecha1');
let fechaFinal = document.getElementById('DateFecha2');

let checkAgendada = document.getElementById("chkEstadoAgendada");
let checkFinalizada = document.getElementById("chkEstadoFinalizada");
let checkCancelada = document.getElementById("chkEstadoCancelada");

const inputFiltro = document.getElementById('txtFiltro');

window.addEventListener("load", () => {
    userSessionC = GetSesion();
  //////////////////// cargar datos desde BD////////////////////
    GetListaCitas();
    if (userSessionC.Rol == 2) {
      GetlistaMascota();
    }
    GetlistaUsuarios();
    registrarCitaUser();
  });
  
  botonFiltrar.addEventListener("click", () => {
    FiltarListaCitas(fechaInicio.value, fechaFinal.value);
  });

  async function GetListaCitas() {
    let result;
    switch (userSessionC.Rol) {
      case 2:
        result = await getCitasUsuario(userSessionC.Identificacion);
        break;
      case 3:
        result = await getCitasVeterinario(userSessionC.Identificacion);
        break;
      default:
        result = await getCitasArray();
        break;
    }
  
    if (result != {} && result.resultado == true) {
      ImprimirListaCitas(result.ListaCitasBD);
      listaCitas =result.ListaCitasBD;
    }
  }

  async function FiltarListaCitas(pFecha1, pFecha2) {
  let fechaStart =  FilterStartDate(pFecha1);
  let fechaEnd =  FilterEndDate(pFecha2);

  let ArrayEstados = [];
if(checkAgendada.checked){
  ArrayEstados.push(checkAgendada.value);
}
if(checkFinalizada.checked){
  ArrayEstados.push(checkFinalizada.value);
}
if(checkCancelada.checked){
  ArrayEstados.push(checkCancelada.value);
}

  let result = await FiltrarCitas(fechaStart, fechaEnd,ArrayEstados);
  console.log(fechaStart)
  console.log(fechaEnd)
  console.log(ArrayEstados)
  if (result != {} && result.resultado == true) {
    console.log(result)
    ImprimirListaCitas(result.ListaCitasBD);
  }
  
}

async function GetlistaMascota() {

    let result = await getMascotasArray(userSessionC.Identificacion);
    if (result != {} && result.resultado == true) {
        listaMascotas = result.MascotasDB;
    
    }
}

async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
        listaUsuarios = result.ListaUsuariosBD;
    }
}


async function ImprimirListaCitas(ListaCitasBD) {

    let tThead = document.getElementById('tTheadRCitas');
    let tbody = document.getElementById('tBodyRCitas');
    let filtroCitas = inputFiltro.value;
    tbody.innerHTML = '';
    tThead.innerHTML = '';


  /////////////// thead ////////////////////////
  let thRow = tThead.insertRow();

  let celNumCita = thRow.insertCell();
  celNumCita.innerHTML = "Num. Cita";

  if ((userSessionC.Rol != 2)) {
    let celPropietario = thRow.insertCell();
    celPropietario.innerHTML = "Propietario";
  }

  let celMascota = thRow.insertCell();
  celMascota.innerHTML = "Mascota";
  if ((userSessionC.Rol != 3)) {
    let celVeterinario = thRow.insertCell();
    celVeterinario.innerHTML = "Veterinario";
  }

  let celFecha = thRow.insertCell();
  celFecha.innerHTML = "Fecha";

  let celEstado = thRow.insertCell();
  celEstado.innerHTML = "Estado";

//   let celAcciones = thRow.insertCell();
//   celAcciones.innerHTML = "Acciones";


  for (let i = 0; i < ListaCitasBD.length; i++) {
    let cita = ListaCitasBD[i];
    let veterinario;
    let propietario;

    if ((userSessionC.Rol != 2 )) {
      let result = await buscaUsuarioID(cita.IdentificacionUsuario);
      if (result != {} && result.resultado == true) {
        propietario = result.usuarioDB;
      }
    }

    if ((userSessionC.Rol != 3)) {
      let result = await buscaUsuarioID(cita.IdentificacionVeterinario);
      if (result != {} && result.resultado == true) {
        veterinario = result.usuarioDB;
      }
    }
   
    // console.log(filtroCitas);
    // console.log(propietario.Nombre.toLowerCase().includes(filtroCitas.toLowerCase()));
    if( propietario.Nombre.toLowerCase().includes(filtroCitas.toLowerCase()) ||
    veterinario.Nombre.toLowerCase().includes(filtroCitas.toLowerCase()) ||
    veterinario.Apellido.toLowerCase().includes(filtroCitas.toLowerCase()) ||
    cita.NombreMascota.toLowerCase().includes(filtroCitas.toLowerCase()) ||
    cita.NumeroCita.toString().includes(filtroCitas.toLowerCase()) 
    ){


    let fila = tbody.insertRow();

    let celdaNumCita = fila.insertCell();
    celdaNumCita.innerHTML = cita.NumeroCita;

    if ((userSessionC.Rol != 2)) {
      let celdaPropietario = fila.insertCell();
      celdaPropietario.innerHTML =
        propietario.Nombre + " " + propietario.Apellido;
    }
    let celdaMascota = fila.insertCell();
    celdaMascota.innerHTML = cita.NombreMascota;

    if ((userSessionC.Rol != 3)) {
      let celdaVeterinario = fila.insertCell();
      celdaVeterinario.innerHTML =
        veterinario.Nombre + " " + veterinario.Apellido;
    }

    let celdaFecha =  fila.insertCell();
    celdaFecha.innerHTML =  shortDate(cita.Fecha);

    let celdaEstado = fila.insertCell();
    celdaEstado.innerHTML = cita.Estado;
    celdaEstado.classList.add("Estado");

    // let celdaBoton = fila.insertCell();
    // if (cita.Estado == "AGENDADA") {
    //   if (userSessionC.Rol !== 3) {
    //     let BotonV = document.createElement("a");
    //     BotonV.setAttribute(
    //       "href",
    //       "/public/VerCitaDatos.html?_id=" +
    //       cita._id +
    //       "&rol=" +
    //       userSessionC.Rol + '&opcion=ver' 
    //     );
    //     let iconoV = document.createElement("i");
    //     iconoV.classList.add("fa-solid");
    //     iconoV.classList.add("fa-eye");
    //     iconoV.classList.add("btnV");
    //     BotonV.appendChild(iconoV);
    //     celdaBoton.appendChild(BotonV);
    //   }

    //   if (userSessionC.Rol !== 2) {
    //     let Boton = document.createElement("a");
    //     Boton.setAttribute(
    //       "href",
    //       "/public/VerCitaDatos.html?_id=" +
    //       cita._id +
    //       "&rol=" +
    //       userSessionC.Rol + '&opcion=compl'
    //     );
    //     let icono = document.createElement("i");
    //     icono.classList.add("fa-solid");
    //     icono.classList.add("fa-pen-to-square");
    //     icono.classList.add("btnEd");
    //     Boton.appendChild(icono);
    //     celdaBoton.appendChild(Boton);
    //   }

    //   let BotonC = document.createElement("a");
    //   BotonC.setAttribute("id", cita.NumeroCita);
    //   BotonC.setAttribute("onclick", "ShowModalCancelFunct(id)");
    //   let iconoC = document.createElement("i");
    //   iconoC.classList.add("fa-solid");
    //   iconoC.classList.add("fa-circle-xmark");
    //   iconoC.classList.add("btnCa");
    //   BotonC.appendChild(iconoC);
    //   celdaBoton.appendChild(BotonC);
    // } else {
    //   let BotonV = document.createElement("a");
    //   BotonV.setAttribute(
    //     "href",
    //     "/public/VerCitaDatos.html?_id=" + cita._id + "&rol=" + userSessionC.Rol + '&opcion=final' + "&estado=" + cita.Estado
    //   );
    //   let iconoV = document.createElement("i");
    //   iconoV.classList.add("fa-solid");
    //   iconoV.classList.add("fa-eye");
    //   iconoV.classList.add("btnV");
    //   BotonV.appendChild(iconoV);
    //   celdaBoton.appendChild(BotonV);
    // }
  }
  }// fin for

  let EstadoCita = document.querySelectorAll(".Estado");
  VerEstado(EstadoCita);
}

function VerEstado(EstadoCita) {

    for (let i = 0; i < EstadoCita.length; i++) {
        let sEstadoCita = EstadoCita[i].innerHTML;
        if (sEstadoCita == 'AGENDADA') {
            EstadoCita[i].classList.add("AGENDADA")

        }
        if (sEstadoCita == 'CANCELADA') {
            EstadoCita[i].classList.add("CANCELADA")

        }
        if (sEstadoCita == 'FINALIZADA') {
            EstadoCita[i].classList.add("FINALIZADA")


        }
    }
}
////////////mascotas no registradas/////////////////
function AsignarNombreOtro() {
    let sIdentificacion =
      inputNombreMascota.options[inputNombreMascota.selectedIndex].text;
    let divNombreOtro = document.getElementById("NombreOtro");
  
    if (sIdentificacion == "Otro") {
      divNombreOtro.classList.remove("hidden");
      console.log(listaUsuarios.length);
    } else {
      divNombreOtro.classList.add("hidden");
    }
  }
  
  function limpiarFormCita() {
    document.getElementById("formCrearCita").reset();
  }
  
  /////////////citas sin perfil///////////////////
  let inputIdUser = document.getElementById("txtidCliente");
  let inputNombreUser = document.getElementById("txtNombreCliente");
  let inputApellidoUser = document.getElementById("txtApellidoCliente");
  let inputEmailUser = document.getElementById("txtEmailCliente");
  let inputDireccionUser = document.getElementById("txtDireccionCliente");
  
  let divIdUser = document.getElementById("RegistroContainer");
  let IdentificacionUsuario;
  let NombreUsuario;
  let ApellidoUsuario;
  let EmailUsuario;
  let DiereccionUsuario;
  ////////////citas usuario no registrado///////////////////
  function registrarCitaUser() {
    if (userSessionC.Rol == 2) {
    //   divIdUser.classList.add("hidden");
    } else {
    //   divIdUser.classList.remove("hidden");
    }
  }
  
  function validarUser() {
    let idUser = inputIdUser.value;
    for (let i = 0; i < listaUsuarios.length; i++) {
      if (listaUsuarios[i].Identificacion == idUser) {
        NombreUsuario = listaUsuarios[i].Nombre;
        ApellidoUsuario = listaUsuarios[i].Apellido;
        EmailUsuario = listaUsuarios[i].Email;
        DiereccionUsuario = listaUsuarios[i].Direccion;
        CargarDatosUser(
          NombreUsuario,
          ApellidoUsuario,
          EmailUsuario,
          DiereccionUsuario,
          idUser
        );
        i = listaUsuarios.length;
      } else {
        if (i == listaUsuarios.length - 1) {
          ImprimirListaMascotasCita(idUser, listaMascotas);
        }
      }
    }
  }
  function CargarDatosUser(
    pNombreUsuario,
    pApellidoUsuario,
    pEmailUsuario,
    pDiereccionUsuario,
    pidUser
  ) {
    inputNombreUser.value = pNombreUsuario;
    inputApellidoUser.value = pApellidoUsuario;
    inputEmailUser.value = pEmailUsuario;
    inputDireccionUser.value = pDiereccionUsuario;
    GetlistaMascotaUser(pidUser);
  }
  function RegistroNuevoUser(idUser) {
    let sNombre = inputNombreUser.value;
    let sApellido = inputApellidoUser.value;
    let sEmail = inputEmailUser.value;
    let sDireccion = inputDireccionUser.value;
  
    for (let i = 0; i < listaUsuarios.length; i++) {
      if (listaUsuarios[i].Identificacion != idUser) {
        if (i == listaUsuarios.length - 1) {
          let passwordUser = "Df1234";
          let fotoUser = "";
          RegistrarUsuario(
            sNombre,
            sApellido,
            idUser,
            sEmail,
            passwordUser,
            sDireccion,
            fotoUser
          );
        }
      }
    }
  }
  
  //////////////////////crear citas////////////////////////////////
  
  let inputNombreMascota = document.querySelector("#selectMascotaCita");
//   let sIdentificacion =
//     inputNombreMascota.options[inputNombreMascota.selectedIndex].text;
  let inputFecha = document.getElementById("txtFecha");
  let inputTipoIdentificacion = document.querySelector("#selectVeterinario");
  let NombreMascotaOtro = document.getElementById("txtNombreOtro");
  let inputDireccion = document.getElementById("txtDireccion");
//   let btnCrear = document.getElementById("btnIniciar");
//   btnCrear.addEventListener("click", CrearCita);
  
  async function CrearCita() {
    if (ValidarDatosCita() == true) {
      if (userSessionC.Rol == 2) {
        IdentificacionUsuario = userSessionC.Identificacion;
      } else {
        IdentificacionUsuario = inputIdUser.value;
      }
  
      RegistroNuevoUser(IdentificacionUsuario);
  
      let IdMascota = "N/D";
      let IdentificacionVeterinario;
      let NombreMascota =
        inputNombreMascota.options[inputNombreMascota.selectedIndex].text;
      console.log("for " + NombreMascota);
      if (NombreMascota === "Otro") {
        NombreMascota = "(Otro) " + NombreMascotaOtro.value;
      }
      for (let i = 0; i < listaMascotas.length; i++) {
        if (
          IdentificacionUsuario == listaMascotas[i].IdentificacionDuenio &&
          NombreMascota == listaMascotas[i].NombreMascota
        ) {
          IdMascota = listaMascotas[i]._id;
        }
      }
      let NombreVeterinario =
        inputTipoIdentificacion.options[inputTipoIdentificacion.selectedIndex]
          .text;
      console.log(NombreVeterinario);
      for (let i = 0; i < listaUsuarios.length; i++) {
        if (NombreVeterinario == listaUsuarios[i].Nombre) {
          IdentificacionVeterinario = listaUsuarios[i].Identificacion;
        } else if (NombreVeterinario === "Aleatorio") {
          let listaVeterinarios = [];
          for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].Rol == 3) {
              listaVeterinarios.push(listaUsuarios[i]);
            }
          }
  
          var num = Math.floor(Math.random() * listaVeterinarios.length);
          NombreVeterinario = listaVeterinarios[num].Nombre;
        }
      }
  
      let FechaHora = inputFecha.value;
      let ObservacionesCita = inputDireccion.value;
      let result = await crearCita(
        IdentificacionUsuario,
        IdMascota,
        NombreMascota,
        FechaHora,
        IdentificacionVeterinario,
        ObservacionesCita,
        new Date().toISOString(),
        userSessionC.Email
      );
      if (result != {} && result.data.resultado == true) {
        ConfirmarDatos(result.data.msj);
        setTimeout(() => {
          limpiarFormCita();
          hiddenCrearModal();
          location.href = "./AppVerCitas.html";
        }, 2000);
      } else {
        MostrarError(result.data.msj);
      }
    }
  }
  
  
  
  ////////////////////validacion de datos cita////////////////////////////
  function ValidarDatosCita() {
    let sNombreMascota = inputNombreMascota.value;
    let dFecha = inputFecha.value;
    let sIdentificacion = inputTipoIdentificacion.value;
    let sDireccion = inputDireccion.value;
  
    if (userSessionC.Rol != 2) {
      let sIdUser = inputIdUser.value;
      let sNombre = inputNombreUser.value;
      let sApellido = inputApellidoUser.value;
      let sEmail = inputEmailUser.value;
      let sDireccion = inputDireccionUser.value;
      const ValidarTexto = /^[a-zA-Z,.' -]+$/;
      const ValidarEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      let isnum = /^\d+$/.test(sIdUser);
  
      if (sIdUser == null || sIdUser == undefined || sIdUser == "") {
        inputIdUser.classList.add("error");
        MostrarError("¡La identificación es requerida!");
        return false;
      }
      if (isnum == false) {
        inputIdUser.classList.add("error");
        MostrarError(
          "¡La identificación debe contener solo números! No puede contener caracteres especiales como guiones."
        );
        return false;
      }
  
      if (sIdUser.length < 9 || sIdUser.length > 12) {
        inputIdUser.classList.add("error");
        MostrarError(
          "¡La cedula persona física debe tener 9 números, cedula persona jurídica 10 números, NITE 10 números y la DIMEX 11 o 12 números! Todas sin cero al inicio ni guiones."
        );
        return false;
      } else {
        inputIdUser.classList.remove("error");
      }
  
      if (sNombre == null || sNombre == undefined || sNombre == "") {
        inputNombreUser.classList.add("error");
        MostrarError("¡El nombre es requerido!");
        return false;
      } else if (sNombre.match(ValidarTexto)) {
        inputNombreUser.classList.remove("error");
      } else {
        inputNombreUser.classList.add("error");
        MostrarError(
          "¡El nombre no puede contener caracteres especiales ni números!"
        );
        return false;
      }
      if (sApellido == null || sApellido == undefined || sApellido == "") {
        inputApellidoUser.classList.add("error");
        MostrarError("¡Formato de apellido no es valido!");
        return false;
      } else if (sApellido.match(ValidarTexto)) {
        inputApellidoUser.classList.remove("error");
      } else {
        inputApellidoUser.classList.add("error");
        MostrarError(
          "El campo de apellido(s) no puede contener caracteres especiales ni números!"
        );
        return false;
      }
  
      if (sEmail == null || sEmail == undefined || sEmail == "") {
        inputEmailUser.classList.add("error");
        MostrarError("¡El correo electrónico requerido!");
        return false;
      } else if (sEmail.match(ValidarEmail)) {
        inputEmailUser.classList.remove("error");
      } else {
        inputEmailUser.classList.add("error");
        MostrarError("¡Formato de correo electrónico no valido!");
        return false;
      }
      if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
        inputDireccionUser.classList.add("error");
        MostrarError("¡La dirección es requerida!");
        return false;
      } else {
        inputDireccionUser.classList.remove("error");
      }
    }
  
    if (
      sNombreMascota == null || sNombreMascota == undefined || sNombreMascota == "") {
      inputNombreMascota.classList.add("error");
      MostrarError("El nombre de la mascota es requerido!");
      return false;
    } else {
      inputNombreMascota.classList.remove("error");
    }
  
    if (dFecha == null || dFecha == undefined || dFecha == "") {
      inputFecha.classList.add("error");
      MostrarError("La fecha es requerida!");
      return false;
    } else {
      inputFecha.classList.remove("error");
    }
    if (new Date() > new Date(dFecha) == true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "la fecha no pueder ser menor al dia de hoy!",
      });
      inputFecha.classList.add("error");
      return false;
    }
  
    if (
      sIdentificacion == null || sIdentificacion == undefined || sIdentificacion == "") {
      inputTipoIdentificacion.classList.add("error");
      MostrarError("El veterinario es requerido!");
      return false;
    } else {
      inputTipoIdentificacion.classList.remove("error");
    }
  
    if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
      inputDireccion.classList.add("error");
      MostrarError("La dirección es requerida!");
      return false;
    } else {
      inputDireccion.classList.remove("error");
    }
    return true;
  }
  
  
  /////////////////////carga Mascotas//////////////////////////
  async function ImprimirListaMascotasCita(user, listaMascotas) {
    let Select = document.getElementById("selectMascotaCita");
    let idCliente = user;
    let opcion;
    let valor = 0;
  
    for (let i = 0; i < listaMascotas.length; i++) {
      if (idCliente == listaMascotas[i].IdentificacionDuenio) {
        opcion = document.createElement("option");
        valor += 1;
        opcion.value = valor;
        opcion.text = listaMascotas[i].NombreMascota;
        Select.appendChild(opcion);
      }
    }
    opcion = document.createElement("option");
    opcion.value = ++valor;
    opcion.text = "Otro";
    Select.appendChild(opcion);
  }
  
  /////////////////carga Veterinarios///////////////////////
  function ImprimirListaVeterinarios(listaUsers) {
    let Select = document.getElementById("selectVeterinario");
    let opcion;
    let valor = 0;
  
    for (let i = 0; i < listaUsers.length; i++) {
      if (listaUsers[i].Rol == 3) {
        opcion = document.createElement("option");
        valor += 1;
        opcion.value = valor;
        opcion.text = listaUsers[i].Nombre;
        Select.appendChild(opcion);
      }
    }
    opcion = document.createElement("option");
    opcion.value = ++valor;
    opcion.text = "Aleatorio";
    Select.appendChild(opcion);
  }
  
