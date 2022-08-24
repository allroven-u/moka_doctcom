'use strict'
let listaCitas = [];
let listaUsuarios = [];

//variables de lineas factura
let factDescripcion = document.getElementById('txtDiagnostico');
let factCantidad = document.getElementById('txtCantidad');
let factPrecio = document.getElementById('txtPrecio');
let factCita = {};

window.addEventListener('load', () => {
    GetlistaUsuarios();
    GetListaCitas();
});

async function GetListaCitas() {

    let result = await getCitasArray();
    if (result != {} && result.resultado == true) {
        listaCitas = result.ListaCitasBD;

        setTimeout(() => {
            llenarCompletarCita();
        }, 50);
    }
}
async function GetlistaUsuarios() {
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
        listaUsuarios = result.ListaUsuariosBD;
    }
}




///////////Obtener id url/////////////////
let queryString, urlParams, _id, usuarioRol;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    usuarioRol = urlParams.get('rol');
}

usuarioRol = Number(usuarioRol);
const boxDiagnosticos = document.querySelector('.box-2');
const boxCancelacion = document.querySelector('.box-3');
const btnsVD = document.querySelector('.btns');
const buttonVerCita = document.getElementById('Pagar');

const boxDescripcion = document.getElementById('boxDescripcion');
const boxPrecio = document.getElementById('boxPrecio');
const boxBtn = document.getElementById('boxBtn');
const tableInfoCita = document.querySelector('.box-client');

if (usuarioRol === 2) {
    boxDescripcion.classList.add('hidden');
    boxPrecio.classList.add('hidden')
    boxBtn.classList.add('hidden')
    tableInfoCita.classList.remove('hidden');
    //boxDiagnosticos.classList.add('hidden');
}else if(usuarioRol !== 2){
    buttonVerCita.classList.toggle('btn-doctor')
    buttonVerCita.value = 'Enviar';
}

let inputNumReservaDatos = document.getElementById('numCitaDatos');
let inputNombreReservaDatos = document.getElementById('txtNombreMascota');
let OutVeterinario = document.getElementById('Vetrinario');
let OutnumCita = document.getElementById('numCita');
let OutfechaCita = document.getElementById('fechaCita');
let Outobservaciones = document.getElementById('observaciones');
let OutestadoCita = document.getElementById('estadoCita');
let OutMotivoCancelar = document.getElementById('txtMotivoCancelar');


function llenarCompletarCita() {
    let veterinario;

    for (let i = 0; i < listaCitas.length; i++) {
        if (listaCitas[i]._id == _id) {
            factCita = listaCitas[i];
            for (let j = 0; j < listaUsuarios.length; j++) {

                if (listaUsuarios[j].Identificacion == listaCitas[i].IdentificacionVeterinario) {
                    veterinario = listaUsuarios[j].Nombre;
                }


            }

            inputNumReservaDatos.innerHTML = 'Cita Numero: ' + listaCitas[i].NumeroCita;
            inputNombreReservaDatos.innerHTML = listaCitas[i].NombreMascota;

            OutnumCita.innerHTML = listaCitas[i].NumeroCita;
            OutVeterinario.innerHTML = veterinario;
            OutfechaCita.innerHTML = listaCitas[i].FechaHora;
            Outobservaciones.innerHTML = listaCitas[i].ObservacionesCita;
            OutestadoCita.innerHTML = listaCitas[i].Estado;
            OutMotivoCancelar.innerHTML = listaCitas[i].NotasCancelacion;

            if(listaCitas[i].Estado === 'CANCELADA'){
                boxDiagnosticos.classList.add('hidden');
                btnsVD.style = "display: none;";
                boxCancelacion.classList.remove('hidden');

            }

        }
    }
}


async function agregarLineas(){

    // Aca se crea la factura en estado creado si es que no esta creada y si ya esta creada se agregan las lineas respectivas
    
   let fact = await crearFactura(factCita.IdentificacionUsuario,factCita.IdMascota,factCita.NombreMascota,new Date().toLocaleDateString(),'');
 
    console.log(new Date().toLocaleDateString());
    //  factDescripcion 
    //  factCantidad 
    //  factPrecio 
    

}