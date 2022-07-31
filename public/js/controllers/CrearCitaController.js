'use strict'
var userSession;
window.addEventListener('load', () =>{
    userSession=GetSesion();
    cargaJson();
    cargaJsonMascota();

    setTimeout(function(){
    
    ImprimirListaMascotasCita(userSession.Identificacion);
    ImprimirListaVeterinarios();
    },3000)
});

let inputNombreMascota = document.querySelector('#selectMascotaCita');
let sIdentificacion = inputNombreMascota.options[inputNombreMascota.selectedIndex].text

let inputFecha = document.getElementById('txtFecha');
let inputTipoIdentificacion = document.querySelector('#selectVeterinario');
let inputDireccion = document.getElementById('txtDireccion');

let btnCrear = document.getElementById('btnIniciar');
btnCrear.addEventListener('click',CrearCita);
var numCita= 0;//guardar base de datos

function CrearCita(){

    if(ValidarDatosCita() == true){
        ConfirmarDatosC();
        numCita++;
        let pendID= userSession.Identificacion;
        let pendCalif = 0;
        let EstadoInicial = "AGENDADA";
        let sNombreMascota = inputNombreMascota.options[inputNombreMascota.selectedIndex].text
        
        let dFecha = inputFecha.value;
        let sIdentificacion = inputNombreMascota.options[inputNombreMascota.selectedIndex].text
        let sDireccion = inputDireccion.value; 
        RegistrarCita(pendID,numCita,sNombreMascota,sIdentificacion,dFecha,EstadoInicial,pendCalif,sDireccion);
        limpiarFormCita();
    }
}

function ValidarDatosCita(){
    
    let sNombreMascota = inputNombreMascota.value;
    let dFecha = inputFecha.value;
    let sIdentificacion = inputTipoIdentificacion.value;
    let sDireccion = inputDireccion.value;
    
    
    if (sNombreMascota == null || sNombreMascota == undefined || sNombreMascota == ""){
        
       
        inputNombreMascota.classList.add("error")
        MostrarErrorC();
        return false;
    }else{
        inputNombreMascota.classList.remove("error")
    }

    if (dFecha == null || dFecha == undefined || dFecha == "" ){
        inputFecha.classList.add("error")
        MostrarErrorC();
        return false;
    }else{
        inputFecha.classList.remove("error")
    }
    if(new Date() > new Date(dFecha) == true ){
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'la fecha no pueder ser menor al dia de hoy!',
        })
        inputFecha.classList.add("error")
        return false;
    }

    if (sIdentificacion == null || sIdentificacion == undefined || sIdentificacion == ""){
        inputTipoIdentificacion.classList.add("error")
        MostrarErrorC();
        return false;
    }else{
        inputTipoIdentificacion.classList.remove("error")
    }

    if (sDireccion == null || sDireccion == undefined || sDireccion == ""){
        inputDireccion.classList.add("error")
        MostrarErrorC();
        return false;
    }else{
        inputDireccion.classList.remove("error")
    }
    return true;
}
function MostrarErrorC(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Dato Requerido!',
    })
}
function ConfirmarDatosC(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cita Asignada',
        showConfirmButton: false,
        timer: 1500
      })
}


//carga Mascotas
function ImprimirListaMascotasCita(user){
    let Select = document.getElementById('selectMascotaCita');
    let idCliente = user;
    let listaMascotas = getMascotasArray();
    
    let opcion;
    let valor = 0;

    
    for (let i = 0; i < listaMascotas.length; i++) {
        
        
        if(idCliente == listaMascotas[i].IdentificacionDuenio){
            opcion = document.createElement('option');
            valor+=1;
            opcion.value = valor;
            opcion.text = listaMascotas[i].NombreMascota;
            Select.appendChild(opcion);
            }
        }
        opcion = document.createElement('option');
        opcion.value = ++valor;
        opcion.text = 'Otro' ;
        Select.appendChild(opcion);
    }

    //carga Veterinarios
function ImprimirListaVeterinarios(){
    let listaUsers = getUsuariosArray();
    let Select = document.getElementById('selectVeterinario');
    let opcion;
    let valor = 0;

    
    for (let i = 0; i < listaUsers.length; i++) {

        if(listaUsers[i].Rol == 3){
            opcion = document.createElement('option');
            valor+=1;
            opcion.value = valor;
            opcion.text = listaUsers[i].Nombre;
            Select.appendChild(opcion);
        }
        
    
        }
        opcion = document.createElement('option');
        opcion.value = ++valor;
        opcion.text = 'Aleatorio';
        Select.appendChild(opcion);
    }

    function AsignarNombreOtro(){
        let sIdentificacion = inputNombreMascota.options[inputNombreMascota.selectedIndex].text
        let divNombreOtro = document.getElementById('NombreOtro');

        if(sIdentificacion == 'Otro' ){
            let input = document.createElement('input');
        input.classList.add('cajas');
        input.setAttribute('id',"txtNombreOtro");
        input.setAttribute('placeholder',"Nombre mascota (opcional)");
        divNombreOtro.appendChild(input);
        }
    }

    function limpiarFormCita(){
        document.getElementById('formCrearCita').reset();
    }


