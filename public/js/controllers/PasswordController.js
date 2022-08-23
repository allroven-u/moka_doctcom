'use strict';

let userSessionC;
let listaUsuariosC;
window.addEventListener('load', async() =>{
    userSessionC=GetSesion();
    await GetlistaUsuariosC();

});

let inputNombreC = document.getElementById('txtUsuario-c');
let inputContrasenha1C = document.getElementById('txtContrasenha-c');
let inputContrasenha2C = document.getElementById('txtContrasenha2-c');


let btnCambiarC = document.getElementById('btnPassword');
btnCambiarC.addEventListener('click',CambiarContrasenha);

function CambiarContrasenha(){
   if(ValidarCambioContrasenha() == true) {
        if(CambiarPassword() == false){
            MostrarError("¡Error no se pudo cambiar la contraseña!")

        }else{
            ConfirmarDatos('¡Cambio de contraseña exitoso!');
            limpiarForm('formCambioC');
            hiddenModalPassword();            
        }



   }
}

function ValidarCambioContrasenha(){
    let sNombre = inputNombreC.value;
    let pwContrasenha = inputContrasenha1C.value;
    let pwContrasenha2 = inputContrasenha2C.value;

    if (sNombre == null || sNombre == undefined || sNombre == ""){
        inputNombreC.classList.add("rError")
        MostrarError("¡El usuario es requerido!");
        return false;

    }else{
        inputNombreC.classList.remove("rError")
    }

    if (pwContrasenha == null || pwContrasenha == undefined || pwContrasenha == ""){
        inputContrasenha1C.classList.add("rError")
        MostrarError("¡La contraseña es requerida!");
        return false;
    }else if(pwContrasenha.length>=6 && pwContrasenha.length<=15){
        inputContrasenha1C.classList.remove("rError")
    }else{
        inputContrasenha1C.classList.add("rError")
        MostrarError("¡La contraseña debe contener entre 6 y 15 caracteres!");
        return false;
    }
    if (pwContrasenha2 == null || pwContrasenha2 == undefined || pwContrasenha2 == "" || pwContrasenha != pwContrasenha2){
        inputContrasenha2C.classList.add("rError")
        MostrarError("¡Las contraseñas no son iguales!");
        return false;
        
    }else{
        inputContrasenha2C.classList.remove("rError")
    }
    return true;
}







async function GetlistaUsuariosC(){
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
       listaUsuariosC = result.ListaUsuariosBD;
       console.log(listaUsuariosC);
    }
  }

async function CambiarPassword(){
    let sEmail = inputNombreC.value;
    let sPassword = inputContrasenha1C.value;
    let sId;
    let result= false;
    for (let i = 0; i < listaUsuariosC.length; i++) {
            if(listaUsuariosC[i].Email == sEmail ){
                sId =listaUsuariosC[i]._id; 
                result= await CambiarCotrasenhaUsuario(sId,sPassword);
                if (result != {} && result.resultado == true) {
                    result = true;
                }
            }   
    }
    return result;
}



function limpiarForm(idForm){
    document.getElementById(idForm).reset();
}
