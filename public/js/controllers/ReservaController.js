'use strict';

let userSessionR;

let listaMascotas = [];
let listaReservas = [];
window.addEventListener('load', () =>{
    userSessionR=GetSesion();
    GetListaReservas();
    GetlistaMascota();
});






async function GetListaReservas() {

    let result = await getReservasArray();
    if( result != {} && result.resultado == true){
        
        ImprimirListaReservas(result.ListaReservasBD)

    }
}


function ImprimirListaReservas(ListaReservasBD){

    let tThead = document.getElementById('tTheadReservas');
    let tbody = document.getElementById('tBodyReservas');


    tbody.innerHTML = '';
    tThead.innerHTML = '';

    // thead
    let thRow = tThead.insertRow();

    let celNumCita = thRow.insertCell();
    celNumCita.innerHTML = 'Num. Reserva';

    // let celPropietario = thRow.insertCell();
    // celPropietario.innerHTML = 'Propietario';

    let celMascota = thRow.insertCell();
    celMascota.innerHTML = 'Mascota';

    let celFechaEnt = thRow.insertCell();
    celFechaEnt.innerHTML = 'Fecha entrada';

    let celFechaSal = thRow.insertCell();
    celFechaSal.innerHTML = 'Fecha salida';

    let celEstado = thRow.insertCell();
    celEstado.innerHTML = 'Estado';

    let celAcciones = thRow.insertCell();
    celAcciones.innerHTML = 'Acciones';


    ///////////citas Usuario/////////////////
    for (let i = 0; i < ListaReservasBD.length; i++) {
        if (ListaReservasBD[i].IdentificacionUsuario == userSessionR.Identificacion){
            listaReservas.push(ListaReservasBD[i]);
            
        }
    }


    function compare_numCita( a, b )
    {
    if ( a.celNumCita < b.celNumCita){
      return -1;
    }
    if ( a.celNumCita  > b.celNumCita){
      return 1;
    }
    return 0;
  }
  
  listaReservas.sort(compare_numCita);
  listaReservas.reverse()
    

    for (let i = 0; i < listaReservas.length; i++) {

        
        let  reserva = listaReservas[i];
        // let propietario = buscaUsuarioID(reserva.IdentificacionUsurio) ;

        let fila = tbody.insertRow();

        let celdaNumReserva = fila.insertCell();
        celdaNumReserva.innerHTML = reserva.NumeroReservacion;

        // let celdaPropietario = fila.insertCell();
        // celdaPropietario.innerHTML = propietario.Nombre + ' ' + propietario.Apellido1 + ' ' + propietario.Apellido2;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = reserva.NombreMascota;

        let celdafechaEnt = fila.insertCell();
        celdafechaEnt.innerHTML = reserva.FechaHoraIngreso;

        let celdaFechaSalida= fila.insertCell();
        celdaFechaSalida.innerHTML = reserva.FechaHoraSalida;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = reserva.Estado;
        celdaEstado.classList.add('Estado');

        let celdaBoton = fila.insertCell();
        
        let EstadoCitaif = document.querySelectorAll('.Estado');
        
        if (EstadoCitaif[i].innerHTML == 'AGENDADA' ) {
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','/public/VerReservacionDatos.html?_id='+reserva._id);
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid")
        iconoV.classList.add("fa-eye")
        iconoV.classList.add("btnV")
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV);
        

        let Boton = document.createElement('a');
        Boton.setAttribute('href','/public/VerReservacionDatos.html?_id='+reserva._id);
        let icono =document.createElement('i');
        icono.classList.add("fa-solid")
        icono.classList.add("fa-pen-to-square")
        icono.classList.add("btnEd")
        Boton.appendChild(icono);
        celdaBoton.appendChild(Boton);

        let BotonC = document.createElement('a');
        BotonC.setAttribute('id',(reserva.NumeroReservacion));
        BotonC.setAttribute('onclick','ShowModalCancelReservaFunct(id)');
        let iconoC =document.createElement('i');
        iconoC.classList.add("fa-solid")
        iconoC.classList.add("fa-circle-xmark")
        iconoC.classList.add("btnCa")
        BotonC.appendChild(iconoC);
        celdaBoton.appendChild(BotonC);
        }else{
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','/public/VerReservacionDatos.html?_id='+reserva._id)
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid")
        iconoV.classList.add("fa-eye")
        iconoV.classList.add("btnV")
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV);
        }

        
     }
    let EstadoCita = document.querySelectorAll('.Estado');
        VerEstado(EstadoCita);
  }


function VerEstado(EstadoCita){
    
    for (let i = 0; i < EstadoCita.length; i++) {
    let sEstadoCita = EstadoCita[i].innerHTML;    

    if (sEstadoCita == 'AGENDADA'){
        EstadoCita[i].classList.add("AGENDADA")
        
    }
    if (sEstadoCita == 'CANCELADA'){
        EstadoCita[i].classList.add("CANCELADA")
       
    }
    if (sEstadoCita == 'FINALIZADA'){
        EstadoCita[i].classList.add("FINALIZADA")
        
        }   
    }
}

async function GetlistaMascota(){

    let result = await getMascotasArray(userSessionR.Identificacion);
    if (result != {} && result.resultado == true) {
        listaMascotas = result.MascotasDB;
        ImprimirListaMascotasReserva(userSessionR.Identificacion,listaMascotas);
    }
}

let inputNombreMascotaReserva = document.querySelector('#selectMacota');
let inputEntrada = document.getElementById('dateCheckIn');
let inputSalida = document.getElementById('dateCheckOut');
let inputCuidadosReserva = document.getElementById('txtCuidadosEsp');

let btnCrearReserva = document.getElementById('btnReserva');
btnCrearReserva.addEventListener('click',CrearReserva);
async function CrearReserva(){
    if(ValidarDatos() ==true){
        
        
        let IdentificacionUsuario= userSessionR.Identificacion;
        let NombreMascota = inputNombreMascotaReserva.options[inputNombreMascotaReserva.selectedIndex].text;
        let IdMascota;
        for (let i = 0; i < listaMascotas.length; i++) {
            if(IdentificacionUsuario == listaMascotas[i].IdentificacionDuenio && NombreMascota == listaMascotas[i].NombreMascota ){
                IdMascota = listaMascotas[i]._id;
            }
        
        }
        let dFechaE = inputEntrada.value;
        let dFechaS = inputSalida.value;
        let sCiuidadosEsp = inputCuidadosReserva.value; 
        await crearReserva(IdentificacionUsuario,IdMascota,NombreMascota,dFechaE,dFechaS,sCiuidadosEsp)
        ConfirmarDatos();
        setTimeout(() => {
            limpiarFormReserva();
            hiddenCrearModal();
            location.href="./AppVerReservas.html"
        }, 2000);

    }
}


function ValidarDatos(){
    let sNombreMascota = inputNombreMascotaReserva.value;
    let dFechaEnt = inputEntrada.value;
    let dFechaSalida = inputSalida.value;
    let sDireccion = inputCuidadosReserva.value;

    if (sNombreMascota == null || sNombreMascota == undefined || sNombreMascota == ""){
        inputNombreMascotaReserva.classList.add("error")
        MostrarError();
        return false;
    }else{
        inputNombreMascotaReserva.classList.remove("error")
    }

    if (dFechaEnt == null || dFechaEnt == undefined || dFechaEnt == ""){
        inputEntrada.classList.add("error")
        MostrarError();
        return false;
    }else{
        inputEntrada.classList.remove("error")
        
    }
    if(new Date() > new Date(dFechaEnt) == true ){
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'la fecha no pueder ser menor al dia de hoy!',
        })
        inputFecha.classList.add("error")
        return false;
    }
    //fecha sumada
    var res = new Date();
        res.setDate(res.getDate() + 15);
     if( res < new Date(dFechaEnt) == true){
         Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'No se pueden hacer reservas con mas de 15 días de anticipación!',
         })
         inputFecha.classList.add("error")
         return false;
     }
    
    if (dFechaSalida == null || dFechaSalida == undefined || dFechaSalida == ""){
        inputSalida.classList.add("error")
        MostrarError();
        return false;
    }else{
        inputSalida.classList.remove("error")
    }

    if (new Date(dFechaEnt) > new Date(dFechaSalida)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La fecha de salida no puede ser menor a la de entrada',
        })
        inputSalida.classList.add("error")
        return false;
    }

    if (sDireccion == null || sDireccion == undefined || sDireccion == ""){
        inputCuidadosReserva.classList.add("error")
        MostrarError();
        return false;
    }else{
        inputCuidadosReserva.classList.remove("error")
    }
    return true;
}
function MostrarError(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Dato Requerido!',
    })
}

function ConfirmarDatos(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Reserva Asignada',
        showConfirmButton: false,
        timer: 1500
      })
}

//carga Mascotas
function ImprimirListaMascotasReserva(user,listaMascotas){
    let Select = document.getElementById('selectMacota');
    let idCliente = user;
    let opcion;
    let valor;


    for (let i = 0; i < listaMascotas.length; i++) {
        
        if(idCliente == listaMascotas[i].IdentificacionDuenio){
            opcion = document.createElement('option');
            valor = (i+1);
            opcion.value = valor;
            opcion.text = listaMascotas[i].NombreMascota;;
            Select.appendChild(opcion);
            }
        }
    }

    function limpiarFormReserva(){
        document.getElementById('formCrearReserva').reset();
    }


function disableScroll() {
    window.scrollTo(0, 0);
}

// MODAL CANCELAR RESERVA

//Cancelar Reserva
const modalCancelarReserva = document.querySelector('#formCancelarReserva');
const overlayCancelarReserva = document.querySelector('.overlay');
const closeCancelarReserva = document.querySelector('#cerrarCancelarR');


// start function show modal
const hiddenCancelModalReserva = function() {
    modalCancelarReserva.classList.add('hidden');
    overlayCancelarReserva.classList.add('hidden');
    window.removeEventListener("scroll", disableScroll);
    
};


function ShowModalCancelReservaFunct(id) {
    llenarModalCancelarReserva(id);
    modalCancelarReserva.classList.remove('hidden');
    overlayCancelarReserva.classList.remove('hidden');
    location.href = '#top-page';
    window.addEventListener("scroll", disableScroll);

    closeCancelarReserva.addEventListener('click', hiddenCancelModalReserva);
    overlayCancelarReserva.addEventListener('click', hiddenCancelModalReserva);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCancelarReserva.classList.contains('hidden')) {
            hiddenCancelModalReserva();
        }
    });
};

// FIN MODAL CANCELAR RESERVA

let outNumReserva= document.getElementById('numReservaCancelar')
let inputCancelar = document.getElementById('motivoCancelar');
async function CancelarReserva() {

    let numReserva = outNumReserva.value;
    let sMotivoCancelar = inputCancelar.value;
    let sEstado = "CANCELADA";


    if (sMotivoCancelar == null || sMotivoCancelar == undefined || sMotivoCancelar == "") {
        inputCancelar.classList.add("error")
        MostrarError('Debe ingresar motivo de cancelación');
        return false;
    } else {
        inputCancelar.classList.remove("error")
        
        let result = await CancelarReservacion(numReserva,sEstado, sMotivoCancelar);

        if (result != {} && result.data.resultado == true) {
            ConfirmarDatos(result.data.msj);
            setTimeout(() => {
                hiddenCancelModalReserva();
                location.href="./AppVerReservas.html"
            }, 2000);
        }else{
            MostrarError(result.data.msj);
            return
        }

        
    }

}

//alarms
function MostrarError(txtError) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: txtError,
    })
}

function ConfirmarDatos(txtConfirmar) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: txtConfirmar,
        showConfirmButton: false,
        timer: 1500
    })
}




//MODAL CREAR RESERVA

const modalCrearReserva = document.querySelector('#formCrearReserva');
const overlay = document.querySelector('.overlay');
const closeCrearReserva = document.querySelector('#cerrarModalReserva');
const showCrearReserva = document.getElementById('show-crear-reserva');
const closeCrearReserva2 = document.querySelector('#cerrarCrearR');


const hiddenCrearModal = function() {
    modalCrearReserva.classList.add("hidden");
    overlay.classList.add("hidden");
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalCrearFunct() {
    modalCrearReserva.classList.remove("hidden");
    overlay.classList.remove("hidden");
    location.href = '#top-page';
    window.addEventListener("scroll", disableScroll);

    closeCrearReserva.addEventListener('click', hiddenCrearModal);
    closeCrearReserva2.addEventListener('click', hiddenCrearModal);
    overlay.addEventListener('click', hiddenCrearModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalCrearReserva.classList.contains('hidden')) {
            hiddenCrearModal();
        }
    });
};

showCrearReserva.addEventListener('click', ShowModalCrearFunct);

// FIN MODAL CREAR RESERVA



function llenarModalCancelarReserva(id){

    for (let i = 0; i < listaReservas.length; i++) {
        if(listaReservas[i].NumeroReservacion == id){
            document.getElementById('numReservaCancelar').value= id;
            document.getElementById('nombreReservaCancelar').value= listaReservas[i].
            NombreMascota;
        }
        
    }
}

