'use strict'

var listaUsuarios;

window.addEventListener('load', () =>{
     cargaJson();   
});



function ImprimirListaUsuarios(){
    let tbody = document.getElementById('tbdListaUsuarios');

    listaUsuarios = getListaUsuarios();

    tbody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {
        
        let usuario = listaUsuarios[i];

        let fila = tbody.insertRow();
        let celdaUsuario = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaApellido1 = fila.insertCell();
        let celdaApellido2 = fila.insertCell();
        let celdaIdentificación = fila.insertCell();
        let celdaEmail = fila.insertCell();
        let celdaActivo = fila.insertCell();
        let celdaRol = fila.insertCell();

        celdaUsuario.innerHTML = usuario.Usuario;
        celdaUsuario.classList.add('infoTd');
        celdaNombre.innerHTML = usuario.Nombre
        celdaNombre.classList.add('infoTd');
        celdaApellido1.innerHTML = usuario.Apellido1;
        celdaApellido1.classList.add('infoTd');
        celdaApellido2.innerHTML = usuario.Apellido2
        celdaApellido2.classList.add('infoTd');
        celdaIdentificación.innerHTML = usuario.Identificacion;
        celdaIdentificación.classList.add('infoTd');
        celdaEmail.innerHTML = usuario.Email;
        celdaEmail.classList.add('infoTd');
        if(usuario.Activo == 1) {
            celdaActivo.innerHTML =   'Activo'
        } else {
            celdaActivo.innerHTML =   'Inactivo'
        }
        celdaActivo.classList.add('infoTd');
        switch (usuario.Rol) {
            case 1:
                celdaRol.innerHTML = 'Administrador';
                break;
            case 2:
                celdaRol.innerHTML = 'Usuario';
                break;
            case 3:
                celdaRol.innerHTML = 'Veterinario(a)';
            break;
            case 4:
                celdaRol.innerHTML = 'Secretario(a)';
            break;
        }
        celdaRol.classList.add('infoTd');
    }
    // let EstadoCita = document.querySelectorAll('.Estado');
    //     console.log(EstadoCita.length);
    //     VerEstadoReservas(EstadoCita);
}


//  function VerEstadoReservas(EstadoCita){
    
//      for (let i = 0; i < EstadoCita.length; i++) {
//      let sEstadoCita = EstadoCita[i].innerHTML;    
//      console.log(sEstadoCita)
//      if (sEstadoCita == 'AGENDADA'){
//          EstadoCita[i].classList.add("AGENDADA")
        
//      }
//      if (sEstadoCita == 'CANCELADA'){
//          EstadoCita[i].classList.add("CANCELADA")
       
//      }
//      if (sEstadoCita == 'FINALIZADA'){
//          EstadoCita[i].classList.add("FINALIZADA")
        
//      }   
//      }
//  }
