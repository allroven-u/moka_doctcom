
// 'use strict'
// let listaMascotas = [];
// let userSession;

// window.addEventListener('load', () =>{
//     userSession=GetSesion();
//     GetlistaMascota();
// });

// async function GetlistaMascota(){

//     let result = await getMascotasArray(userSession.Identificacion);
//     if (result != {} && result.resultado == true) {
//         listaMascotas = result.MascotasDB;
//         ImprimirListaMascotasReserva(userSession.Identificacion,listaMascotas);
//     }
// }

// let inputNombreMascotaReserva = document.querySelector('#selectMacota');
// let inputEntrada = document.getElementById('dateCheckIn');
// let inputSalida = document.getElementById('dateCheckOut');
// let inputCuidadosReserva = document.getElementById('txtCuidadosEsp');

// let btnCrearReserva = document.getElementById('btnReserva');
// btnCrearReserva.addEventListener('click',CrearReserva);
// async function CrearReserva(){
//     if(ValidarDatos() ==true){
        
        
//         let IdentificacionUsuario= userSession.Identificacion;
//         let NombreMascota = inputNombreMascotaReserva.options[inputNombreMascotaReserva.selectedIndex].text;
//         let IdMascota;
//         for (let i = 0; i < listaMascotas.length; i++) {
//             if(IdentificacionUsuario == listaMascotas[i].IdentificacionDuenio && NombreMascota == listaMascotas[i].NombreMascota ){
//                 IdMascota = listaMascotas[i]._id;
//             }
        
//         }
//         let dFechaE = inputEntrada.value;
//         let dFechaS = inputSalida.value;
//         let sCiuidadosEsp = inputCuidadosReserva.value; 
//         await crearReserva(IdentificacionUsuario,IdMascota,NombreMascota,dFechaE,dFechaS,sCiuidadosEsp)
//         ConfirmarDatos();
//         setTimeout(() => {
//             limpiarFormReserva();
//             hiddenModalReservaFunct();
//             location.href="./AppVerReservas.html"
//         }, 2000);

//     }
// }


// function ValidarDatos(){
//     let sNombreMascota = inputNombreMascotaReserva.value;
//     let dFechaEnt = inputEntrada.value;
//     let dFechaSalida = inputSalida.value;
//     let sDireccion = inputCuidadosReserva.value;

//     if (sNombreMascota == null || sNombreMascota == undefined || sNombreMascota == ""){
//         inputNombreMascotaReserva.classList.add("error")
//         MostrarError();
//         return false;
//     }else{
//         inputNombreMascotaReserva.classList.remove("error")
//     }

//     if (dFechaEnt == null || dFechaEnt == undefined || dFechaEnt == ""){
//         inputEntrada.classList.add("error")
//         MostrarError();
//         return false;
//     }else{
//         inputEntrada.classList.remove("error")
        
//     }
//     if(new Date() > new Date(dFechaEnt) == true ){
        
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'la fecha no pueder ser menor al dia de hoy!',
//         })
//         inputFecha.classList.add("error")
//         return false;
//     }
//     //fecha sumada
//     var res = new Date();
//         res.setDate(res.getDate() + 15);
//      if( res < new Date(dFechaEnt) == true){
//          Swal.fire({
//              icon: 'error',
//              title: 'Oops...',
//              text: 'No se pueden hacer reservas con mas de 15 días de anticipación!',
//          })
//          inputFecha.classList.add("error")
//          return false;
//      }
    
//     if (dFechaSalida == null || dFechaSalida == undefined || dFechaSalida == ""){
//         inputSalida.classList.add("error")
//         MostrarError();
//         return false;
//     }else{
//         inputSalida.classList.remove("error")
//     }

//     if (new Date(dFechaEnt) > new Date(dFechaSalida)) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'La fecha de salida no puede ser menor a la de entrada',
//         })
//         inputSalida.classList.add("error")
//         return false;
//     }

//     if (sDireccion == null || sDireccion == undefined || sDireccion == ""){
//         inputCuidadosReserva.classList.add("error")
//         MostrarError();
//         return false;
//     }else{
//         inputCuidadosReserva.classList.remove("error")
//     }
//     return true;
// }
// function MostrarError(){
//     Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Dato Requerido!',
//     })
// }

// function ConfirmarDatos(){
//     Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Reserva Asignada',
//         showConfirmButton: false,
//         timer: 1500
//       })
// }

// //carga Mascotas
// function ImprimirListaMascotasReserva(user,listaMascotas){
//     let Select = document.getElementById('selectMacota');
//     let idCliente = user;
//     let opcion;
//     let valor;


//     for (let i = 0; i < listaMascotas.length; i++) {
        
//         if(idCliente == listaMascotas[i].IdentificacionDuenio){
//             opcion = document.createElement('option');
//             valor = (i+1);
//             opcion.value = valor;
//             opcion.text = listaMascotas[i].NombreMascota;;
//             Select.appendChild(opcion);
//             }
//         }
//     }

//     function limpiarFormReserva(){
//         document.getElementById('formCrearReserva').reset();
//     }