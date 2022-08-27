
'use strict';
let txtUsuarioLogueado2 = document.getElementById('TxtUsuarioLogueado2');
let txtNombreP = document.getElementById('txtNombreP');
let txtApellidosP = document.getElementById('txtApellidosP');
let txtCedulaP = document.getElementById('txtCedulaP');
let txtEmailP = document.getElementById('txtEmailP');
let txtPhoneP = document.getElementById('txtPhoneP');
let txtContraseniaP = document.getElementById('txtContraseniaP');
let txtDireccionP = document.getElementById('txtDireccionP');
let txtFotoPerfil = document.getElementById('FotoPerfilUser');
let txtEpecialidad = document.getElementById('txtEspecialidad');
let txtInfoVet = document.getElementById('txtInfoVet');


let usuario;
let factura;
let listaUsuarios=[];
let facturasUser=[];
///////////Obtener id url/////////////////
let queryString, urlParams, _id, usuarioRol;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    usuarioRol = urlParams.get('rol');
}



window.addEventListener('load', async() => {
  usuario = GetSesion();
  await GetListaCitas(usuario.Identificacion);
  await GetFactura();
  cargarFacturas();
});

async function GetListaCitas(idUser) {

  let result = await getCitasArray();
  if (result != {} && result.resultado == true) {
    
    GetlistaUsuarios(result.ListaCitasBD, idUser)
  }
}

async function GetlistaUsuarios(ListaCitasBD, idUser) {
  let result = await getUsuariosArray();
  if (result != {} && result.resultado == true) {
    listaUsuarios = result.ListaUsuariosBD;
    if (usuario.Rol == 1 && _id!= null) {
      CargarDatosAdmin(listaUsuarios)
    }else{
      CargarDatosUser(idUser, listaUsuarios)
    }
    
    ImprimirListaCitas(ListaCitasBD, listaUsuarios, idUser);
  }
}



async function GetFactura() {
  let result = await getFacturasArray();
  if (result != {} && result.resultado == true) {
      
      factura = result.ListaFacturasBD;
      
      for (let i = 0; i < factura.length; i++) {
        if (factura[i].IdentificacionUsuario == usuario.Identificacion) {
          
          facturasUser.push(factura[i])
          
        }
        
      }
  }
}

let tbody = document.getElementById('PagosUser')
function cargarFacturas(){
  for (let i = 0; i < facturasUser.length; i++) {
  let fila = tbody.insertRow();

  let celdaFecha = fila.insertCell();
  celdaFecha.innerHTML = facturasUser[i].Fecha.toString();
  celdaFecha.classList.add("detalle");
  

  let celdaCosto = fila.insertCell();
  console.log(facturasUser[i].Lineas)
  celdaCosto.innerHTML = facturasUser[i].NumeroFactura;
  celdaCosto.classList.add("precio");
}
}




async function CargarDatosUser(userSession, listaUsuarios) {

  for (let i = 0; i < listaUsuarios.length; i++) {

    if (listaUsuarios[i].Identificacion == userSession) {
      txtUsuarioLogueado2.textContent = listaUsuarios[i].Nombre + ' ' + listaUsuarios[i].Apellido;
      txtNombreP.textContent = listaUsuarios[i].Nombre;
      txtApellidosP.textContent = listaUsuarios[i].Apellido;
      txtCedulaP.textContent = listaUsuarios[i].Identificacion;
      txtEmailP.textContent = listaUsuarios[i].Email;
      txtPhoneP.textContent = listaUsuarios[i].Telefono;
      txtDireccionP.innerHTML = listaUsuarios[i].Direccion;
      txtFotoPerfil.src = listaUsuarios[i].Foto;
      if (listaUsuarios[i].Rol == 3) {
        let result = await buscaVeterinarioID(listaUsuarios[i].Identificacion);
        if (result.VeterinarioDB != null){
          txtEpecialidad.textContent = result.VeterinarioDB.Especialidad;
          txtInfoVet.textContent = result.VeterinarioDB.InfoVet;
        }
      }
    }

  }
}



function CargarDatosAdmin(listaUsuarios) {

  for (let i = 0; i < listaUsuarios.length; i++) {

    if (listaUsuarios[i]._id == _id) {
      txtUsuarioLogueado2.textContent = listaUsuarios[i].Nombre + ' ' + listaUsuarios[i].Apellido;
      txtNombreP.textContent = listaUsuarios[i].Nombre;
      txtApellidosP.textContent = listaUsuarios[i].Apellido;
      txtCedulaP.textContent = listaUsuarios[i].Identificacion;
      txtEmailP.textContent = listaUsuarios[i].Email;
      txtPhoneP.textContent = listaUsuarios[i].Telefono;
      txtDireccionP.innerHTML = listaUsuarios[i].Direccion;
      txtFotoPerfil.src = listaUsuarios[i].Foto;
    }

  }
}

function ImprimirListaCitas(ListaCitasBD, listaUsuarios, idUser) {
  let tbody = document.getElementById('tbbody-ultimas-citas');

  let listaCitas = ListaCitasBD;



  tbody.innerHTML = '';
  let countCita = 0;
  for (let i = 0; i < listaCitas.length; i++) {
    let cita = listaCitas[i];
    if ((cita.IdentificacionUsuario == idUser) && countCita < 5) {
      countCita += 1;
      let fila = tbody.insertRow();
      let celdaCita = fila.insertCell();
      let celdaMascota = fila.insertCell();
      let celdaVeterinario = fila.insertCell();
      let celdaFecha = fila.insertCell();

      celdaCita.innerHTML = cita.NumeroCita
      celdaCita.classList.add('h-citas');
      celdaMascota.innerHTML = cita.NombreMascota;
      celdaMascota.classList.add('h-citas');
      for (let j = 0; j < listaUsuarios.length; j++) {
        if (listaUsuarios[j].Identificacion == cita.IdentificacionVeterinario)
          celdaVeterinario.innerHTML = listaUsuarios[j].Nombre + ' ' + listaUsuarios[j].Apellido;
      }
      celdaVeterinario.classList.add('h-citas');
      celdaFecha.innerHTML = cita.Fecha;
      celdaFecha.classList.add('h-citas');
    }
  };

};

usuario = GetSesion();
console.log(usuario);
const historialPagos = document.querySelector('.historial-de-pagos');
const historialMascota = document.querySelector('.historial-mascota');
const metodosPago = document.querySelector('.metodos-de-pago');
const veteBox = document.querySelector('.InfoVetContainer-Principal');

if(Number(usuario.Rol) === 2){
  historialPagos.classList.remove('hidden');
  historialMascota.classList.remove('hidden');
  metodosPago.classList.remove('hidden');
}
if(Number(usuario.Rol) === 3){
  veteBox.classList.remove('hidden');
}
if(Number(usuario.Rol) === 1){
  metodosPago.classList.remove('hidden');
}

