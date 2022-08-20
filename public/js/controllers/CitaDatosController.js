'use strict'
let listaCitas = [];
let listaUsuarios= [];
window.addEventListener('load', () =>{
    GetlistaUsuarios();
    GetListaCitas();
    
});

async function GetListaCitas() {

    let result = await getCitasArray();
    if( result != {} && result.resultado == true){
        listaCitas=result.ListaCitasBD;

        setTimeout(() => {
            llenarCompletarCita();
        }, 50);
        

    }
}
async function GetlistaUsuarios(){
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
        listaUsuarios = result.ListaUsuariosBD;
        console.log(listaUsuarios);
    }
}

///////////Obtener id url/////////////////
let queryString, urlParams, _id;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    console.log(_id);
}

let inputNumReservaDatos = document.getElementById('numCitaDatos');
let inputNombreReservaDatos = document.getElementById('txtNombreMascota');
let OutVeterinario = document.getElementById('Vetrinario');
let OutnumCita = document.getElementById('numCita');
let OutfechaCita = document.getElementById('fechaCita');
let Outobservaciones = document.getElementById('observaciones');
let OutestadoCita = document.getElementById('estadoCita');


function llenarCompletarCita(){
    let veterinario;

    for (let i = 0; i < listaCitas.length; i++) {
        if(listaCitas[i]._id == _id){
            for (let j = 0; j < listaUsuarios.length; j++) {
                 console.log(listaUsuarios[j].Identificacion);
                if(listaUsuarios[j].Identificacion == listaCitas[i].IdentificacionVeterinario){
                    veterinario = listaUsuarios[j].Nombre;
                }

                
            }
            
            inputNumReservaDatos.innerHTML= 'Cita Numero: '+listaCitas[i].NumeroCita;
            inputNombreReservaDatos.innerHTML=listaCitas[i].NombreMascota;

            OutnumCita.innerHTML = listaCitas[i].NumeroCita;
            OutVeterinario.innerHTML= veterinario;
            OutfechaCita.innerHTML = listaCitas[i].FechaHora;
            Outobservaciones.innerHTML=listaCitas[i].ObservacionesCita;
            OutestadoCita.innerHTML=listaCitas[i].Estado;
        }
    }    
}