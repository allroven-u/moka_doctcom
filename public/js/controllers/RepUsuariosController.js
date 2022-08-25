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

    let celAcciones = thRow.insertCell();
    celAcciones.innerHTML = 'Acciones';


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
          let celdaBoton = fila.insertCell();
          // let BotonV = document.createElement("a");
          // BotonV.setAttribute(
          //   "href",
          //   "/public/MiPerfil.html?_id=" +
          //   usuario._id 
          // );
          // let iconoV = document.createElement("i");
          // iconoV.classList.add("fa-solid");
          // iconoV.classList.add("fa-eye");
          // iconoV.classList.add("btnV");
          // BotonV.appendChild(iconoV);
          // celdaBoton.appendChild(BotonV);

          let BotonE = document.createElement("a");
          BotonE.setAttribute(
            "href",
            "/public/MiPerfilEditable.html?_id=" +
            usuario._id 
          );
          let iconoE = document.createElement("i");
          iconoE.classList.add("fa-solid");
          iconoE.classList.add("fa-pen-to-square");
          iconoE.classList.add("btnEd");
          BotonE.appendChild(iconoE);
          celdaBoton.appendChild(BotonE);
       

    }

}
/////////////////////////////pruebas///////////////////////////

const signinModal = document.querySelector(".rModal-form");
const showModalSignin = document.getElementById("showCrearUser")
const closeModalsignin = document.getElementById("cerrarRmodal");
const overlay = document.querySelector(".overlay");
var cerrarModalesX = document.querySelector('.cerrarModalInicio');

///////////////////// SHOW MODAL SIGNIN AND HIDE CODE //////////////////

function hiddenModalSignin() {
      signinModal.classList.add("hidden");
      overlay.classList.add("hidden");
      window.removeEventListener("scroll", disableScroll);
      limpiarFormSignin();
  };

  // start function show modal
  function ShowModalSigninFunct() {
      signinModal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      location.href = "#top-page";
      window.addEventListener("scroll", disableScroll);

      closeModalsignin.addEventListener("click",hiddenModalSignin);
      
   
       cerrarModalesX.addEventListener('click',hiddenModalSignin);
            
      overlay.addEventListener("click", hiddenModalSignin);
      document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && !signinModal.classList.contains("hidden")) {
              hiddenModalSignin();
          }
      });
  };

  showModalSignin.addEventListener("click",ShowModalSigninFunct);
  


function disableScroll() {
  window.scrollTo(0, 0);
}

const limpiarFormSignin = function () {
  signinModal.reset();
}