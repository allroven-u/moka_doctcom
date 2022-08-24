
'use strict';
let txtUsuarioLogueado2 = document.getElementById('TxtUsuarioLogueado2');
let txtNombreP = document.getElementById('txtNombreP');
let txtApellidosP = document.getElementById('txtApellidosP');
let txtCedulaP = document.getElementById('txtCedulaP');
let txtEmailP = document.getElementById('txtEmailP');
let txtUsuarioP = document.getElementById('txtUsuarioP');
let txtContraseniaP = document.getElementById('txtContraseniaP');
let txtDireccionP = document.getElementById('txtDireccionP');
let txtFotoPerfil = document.getElementById('FotoPerfilUser');
let usuario;


///////////Obtener id url/////////////////
let queryString, urlParams, _id, usuarioRol;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    usuarioRol = urlParams.get('rol');
}



window.addEventListener('load', () => {
  usuario = GetSesion();
  GetListaCitas(usuario.Identificacion);
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
    let listaUsuarios = result.ListaUsuariosBD;
    if (usuario.Rol == 1 && _id!= null) {
      CargarDatosAdmin(listaUsuarios)
    }else{
      CargarDatosUser(idUser, listaUsuarios)
    }
    
    ImprimirListaCitas(ListaCitasBD, listaUsuarios, idUser);
  }
}




function CargarDatosUser(userSession, listaUsuarios) {

  for (let i = 0; i < listaUsuarios.length; i++) {

    if (listaUsuarios[i].Identificacion == userSession) {
      txtUsuarioLogueado2.textContent = listaUsuarios[i].Nombre + ' ' + listaUsuarios[i].Apellido;
      txtNombreP.textContent = listaUsuarios[i].Nombre;
      txtApellidosP.textContent = listaUsuarios[i].Apellido;
      txtCedulaP.textContent = listaUsuarios[i].Identificacion;
      txtEmailP.textContent = listaUsuarios[i].Email;
      txtDireccionP.innerHTML = listaUsuarios[i].Direccion;
      txtFotoPerfil.src = listaUsuarios[i].Foto;
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
      celdaFecha.innerHTML = cita.FechaHora;
      celdaFecha.classList.add('h-citas');
    }
  };

};