'use strict';

let listaUsuarios = [];
let userSessionLU;

window.addEventListener('load', () => {
    userSessionLU = GetSesion();
    GetlistaUsuarios();
});



async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
        listaUsuarios = result.ListaUsuariosBD;
        ImprimirListaUsuarios(listaUsuarios);
    }
}

function ImprimirListaUsuarios(listaUsuariosBD) {

    let tThead = document.getElementById('tTheadListUsuarios');
    let tbody = document.getElementById('tBodyListUsuarios');

    tbody.innerHTML = '';
    tThead.innerHTML = '';


    // thead
    let thRow = tThead.insertRow();

    let celIdentificacion = thRow.insertCell();
    celIdentificacion.innerHTML = 'Identificación';


    let celNombre = thRow.insertCell();
    celNombre.innerHTML = 'Nombre';

     let celApellido = thRow.insertCell();
     celApellido.innerHTML = 'Apellidos';

    let celEmail = thRow.insertCell();
    celEmail.innerHTML = 'Email';

    let celActivo = thRow.insertCell();
    celActivo.innerHTML = 'Activo';

    let celRol = thRow.insertCell();
    celRol.innerHTML = 'Rol';


    for (let i = 0; i < listaUsuariosBD.length; i++) {


        let usuario = listaUsuariosBD[i];

        let fila = tbody.insertRow();

        let celdaIdentificacion = fila.insertCell();
        celdaIdentificacion.innerHTML = usuario.Identificacion;

        let celdaNombre = fila.insertCell();
        celdaNombre.innerHTML = usuario.Nombre;

         let celdaApellido = fila.insertCell();
         celdaApellido.innerHTML = usuario.Apellido;

        let celdaEmail = fila.insertCell();
        celdaEmail.innerHTML = usuario.Email;

        let celdaActivo = fila.insertCell();
        if(usuario.Activo == 1) 
        celdaActivo.innerHTML = 'Si';
        else
        celdaActivo.innerHTML = 'No';
      
        let celdaRol = fila.insertCell();
        
        switch(usuario.Rol) {
            case 1:
                celdaRol.innerHTML = 'Administrador'
              break;
            case 2:
                celdaRol.innerHTML = 'Cliente'
              break;
            case 3:
                celdaRol.innerHTML = 'Veterinario'
              break;
            case 4:
                celdaRol.innerHTML = 'Secretaria'
              break;
            default:
                celdaRol.innerHTML = 'Otro'
          }

        
       

    }

}