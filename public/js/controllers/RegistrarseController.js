'use strict';


let btnRegistrar = document.getElementById("btnRegistrar");
let inputNombre = document.getElementById("txtNombre");
let inputApellido = document.getElementById("txtApellido");
let inputCedula = document.getElementById("numCedula");
let inputEmail = document.getElementById("txtEmail");
let inputContrasenha1 = document.getElementById("txtContrasenha");
let inputContrasenha2 = document.getElementById("txtContrasenha2");
let inputDireccion = document.getElementById("txtDireccion");

btnRegistrar.addEventListener("click", Registrar);

async function Registrar() {
    if (ValidarDatos() == true) {
        
        let sNombre = inputNombre.value;
        let sApellido = inputApellido.value;
        let sCedula = inputCedula.value;
        let sEmail = inputEmail.value;
        let pwContrasenha = inputContrasenha1.value;
        let sDireccion = inputDireccion.value;
        let sFoto='';
        let pfecha = new Date().toISOString();

        let result = await RegistrarUsuario(sNombre,sApellido,sCedula,sEmail,pwContrasenha,sDireccion,sFoto,pfecha)
        console.log(result.data)
        if (result != {} && result.data.resultado) {
            ConfirmarDatos(result.data.msj);
            limpiarForm('formRegistroUser');
            hiddenModalSignin();
        }else{
            MostrarError(result.data.msj);
        }
    }
}

function ValidarDatos() {
    let sNombre = inputNombre.value;
    let sApellido = inputApellido.value;
    let sCedula = inputCedula.value;
    let sEmail = inputEmail.value;
    let pwContrasenha = inputContrasenha1.value;
    let pwContrasenha2 = inputContrasenha2.value;
    let sDireccion = inputDireccion.value;
    const ValidarTexto = /^[a-zA-Z,.'áéíóú -]+$/;
    const ValidarEmail =/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    let isnum = /^\d+$/.test(sCedula);

    if (sNombre == null || sNombre == undefined || sNombre == "") {
        inputNombre.classList.add("rError")
        MostrarError("¡El nombre es requerido!");
        return false;

    }else if(sNombre.match(ValidarTexto)){
        inputNombre.classList.remove("rError")
        
    } else {
        inputNombre.classList.add("rError")
        MostrarError("¡El nombre no puede contener caracteres especiales ni números!");
        return false;
    }
    if (sApellido == null || sApellido == undefined || sApellido == "") {
        inputApellido.classList.add("rError")
        MostrarError("¡Formato de apellido no es valido!");
        return false;
    } else if(sApellido.match(ValidarTexto)) {
        inputApellido.classList.remove("rError")
    }else{
        inputApellido.classList.add("rError")
        MostrarError("El campo de apellido(s) no puede contener caracteres especiales ni números!");
        return false;
    }
    
    if (sCedula == null || sCedula == undefined || sCedula == "") {
        inputCedula.classList.add("rError")
        MostrarError("¡La identificación es requerida!");
        return false;
    }
    if (isnum == false) {
        inputCedula.classList.add("rError")
        MostrarError("¡La identificación debe contener solo números! No puede contener caracteres especiales como guiones.");
        return false;
    }

    if (sCedula.length < 9 || sCedula.length > 12) {
        inputCedula.classList.add("rError")
        MostrarError("¡La cedula persona física debe tener 9 números, cedula persona jurídica 10 números, NITE 10 números y la DIMEX 11 o 12 números! Todas sin cero al inicio ni guiones.");
        return false;
    }
    else {
        inputCedula.classList.remove("rError")
    }

    if (sEmail == null || sEmail == undefined || sEmail == "") {
        inputEmail.classList.add("rError")
        MostrarError("¡El correo electrónico requerido!");
        return false;
    } else if(sEmail.match(ValidarEmail)) {
        inputEmail.classList.remove("rError")
    }else{
        inputEmail.classList.add("rError")
        MostrarError("¡Formato de correo electrónico no valido!");
        return false;
    }
    if (pwContrasenha == null || pwContrasenha == undefined || pwContrasenha == "") {
        inputContrasenha1.classList.add("rError")
        MostrarError("¡La contraseña es requerida!");
        return false;
    } else if(pwContrasenha.length>=6 && pwContrasenha.length<=15) {
        inputContrasenha1.classList.remove("rError")
    }else{
        inputContrasenha1.classList.add("rError")
        MostrarError("¡La contraseña debe contener entre 6 y 15 caracteres!");
        return false;
    }
    if (pwContrasenha2 == null || pwContrasenha2 == undefined || pwContrasenha2 == "" || pwContrasenha != pwContrasenha2) {
        inputContrasenha2.classList.add("rError")
        MostrarError('¡Las contraseñas no son iguales!');
        return false;

    } else {
        inputContrasenha2.classList.remove("rError")
    }
    if (sDireccion == null || sDireccion == undefined || sDireccion == "") {
        inputDireccion.classList.add("rError")
        MostrarError('¡La dirección es requerida!');
        return false;
    } else {
        inputDireccion.classList.remove("rError")
    }
    return true;
}


function limpiarForm(idform){
    document.getElementById(idform).reset();
}