'use strict';
let txtMascota = document.getElementById('TxtMascotaM');
let txtDireccionM = document.getElementById('txtDireccionM');
let txtCalificacionM = document.getElementById('txtCalificacionM');
let txtEstadoM = document.getElementById('txtEstadoM');
let fotoMascota = document.getElementById('imgMascota');

let listaMascotas = [];
let userSessionM = GetSesion();

let btnRemoverMascota = document.getElementById('removerMascota');
btnRemoverMascota.addEventListener('click', EliminarMascota);


async function GetlistaMascota() {
    let result = await getMascotasArray(userSessionM.Identificacion);
    if (result != {} && result.resultado == true) {
        listaMascotas = result.MascotasDB;
    }
    return listaMascotas;
}

///////////Obtener id url/////////////////
let queryString, urlParams, _id;
IdentificarAccion();
async function IdentificarAccion() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    await ImprimirDatosMascota(_id);
}

async function ImprimirDatosMascota(p_id) {
    let cargarMascotas = await GetlistaMascota();
    for (let i = 0; i < cargarMascotas.length; i++) {
        if (cargarMascotas[i]._id === p_id) {
            txtMascota.textContent = cargarMascotas[i].NombreMascota;
            txtDireccionM.textContent = cargarMascotas[i].Direccion;
            txtEstadoM.textContent = cargarMascotas[i].Estado;
            fotoMascota.src = cargarMascotas[i].Foto;
            ImprimirListaCitas(cargarMascotas[i]._id);
            let calificacion = Number(cargarMascotas[i].CalificacionPromedio);
            let editarInfoBtn = document.getElementById('editarInfo');
            editarInfoBtn.addEventListener('click', function () {
                location.href = './perfilMascotaEditable.html?_id=' + cargarMascotas[i]._id;
            })
            for (let c = 0; c < calificacion; c++) {
                let addStars = document.createElement('i');
                txtCalificacionM.appendChild(addStars);
                addStars.classList.add('fa-solid');
                addStars.classList.add('fa-star');
            }



            //<i class="fa-solid fa-star"></i>
        }
    }
}

//async function EliminarMascota() {
//    let result = await DesactivarMascota(_id);
//    if (result != {} && result.resultado) {
//        ConfirmarDatos(result.msj);
//        setTimeout(function () {
//            location.href = "./Mascotas.html";
//        }, 2000);
//    } else {
//        MostrarError(result.msj);
//    };
//}


async function EliminarMascota() {

    let cargarMascotas = await GetlistaMascota();
    for (let i = 0; i < cargarMascotas.length; i++) {
        if (cargarMascotas[i]._id === _id) {
            let confirmacion = false;
            await Swal.fire({
                title: 'Desea eliminar el registro de ' + cargarMascotas[i].NombreMascota,
                showDenyButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: 'Cancelar',
                icon: 'warning'
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
                let result = await DesactivarMascota(_id);
                if (result != {} && result.resultado) {
                    ConfirmarDatos(result.msj);
                    setTimeout(function () {
                        location.href = "./Mascotas.html";
                    }, 2000);
                } else {
                    MostrarError(result.msj);
                };
                // await GetListaPersonas();
            }
        }
    }

};






async function ImprimirListaCitas(pp_id) {
    let tbody = document.getElementById('tbbody-ultimas-citas');

    let listaCitas = await getCitasUsuario(userSessionM.Identificacion);
    listaCitas = listaCitas.ListaCitasBD;

    tbody.innerHTML = '';

    for (let i = 0; i < listaCitas.length; i++) {

        if (listaCitas[i].IdMascota === pp_id) {

            let cita = listaCitas[i];
            let veterinario = await buscaUsuarioID(cita.IdentificacionVeterinario);
            veterinario = veterinario.usuarioDB;

            let fila = tbody.insertRow();
            let celdaNumCita = fila.insertCell();
            let celdaMascota = fila.insertCell();
            let celdaVeterinario = fila.insertCell();
            let celdaFecha = fila.insertCell();
            let celdaEstado = fila.insertCell();

            celdaNumCita.innerHTML = cita.NumeroCita;
            celdaNumCita.classList.add('h-citas');
            celdaMascota.innerHTML = cita.NombreMascota;
            celdaMascota.classList.add('h-citas');
            celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido;
            celdaVeterinario.classList.add('h-citas');
            celdaFecha.innerHTML = cita.FechaHora;
            celdaFecha.classList.add('h-citas');
            celdaEstado.innerHTML = cita.Estado;
            celdaEstado.classList.add('Estado');
            celdaEstado.classList.add('h-citas');
        }




    }
    let EstadoCita = document.querySelectorAll('.Estado');
    VerEstado(EstadoCita);

};

function VerEstado(EstadoCita) {

    for (let i = 0; i < EstadoCita.length; i++) {
        let sEstadoCita = EstadoCita[i].innerHTML;
        if (sEstadoCita == 'AGENDADA') {
            EstadoCita[i].classList.add("AGENDADA")
        }
        if (sEstadoCita == 'CANCELADA') {
            EstadoCita[i].classList.add("CANCELADA")

        }
        if (sEstadoCita == 'FINALIZADA') {
            EstadoCita[i].classList.add("FINALIZADA")

        }
    }
}





























/*let listaMascotas = [];
let userSessionM = GetSesion();





const btnAnnadirMascota = document.getElementById('annadir-mascota');
const modalRegisMascot = document.querySelector('.form-registro-mascota');
const overlayRegistroM = document.querySelector('.overlay');
const closeModalMascota = document.getElementById('btnCancelarRegistroM');
const closeModalMascota2 = document.getElementById('cerrarAnnadirM');

function disableScroll() {
    window.scrollTo(0, 0);
}




const hiddenRegistroM = function () {
    modalRegisMascot.classList.add('hidden');
    overlayRegistroM.classList.add('hidden');
    window.removeEventListener("scroll", disableScroll);
};

// start function show modal
function ShowModalRegistroM() {
    modalRegisMascot.classList.remove('hidden');
    overlayRegistroM.classList.remove('hidden');
    window.addEventListener("scroll", disableScroll);

    closeModalMascota.addEventListener('click', hiddenRegistroM);
    closeModalMascota2.addEventListener('click', hiddenRegistroM);
    overlayRegistroM.addEventListener('click', hiddenRegistroM);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalRegisMascot.classList.contains('hidden')) {
            hiddenRegistroM();
        }
    });
};

btnAnnadirMascota.addEventListener('click', function () {
    ShowModalRegistroM();
});

GetlistaMascota()

async function GetlistaMascota() {
    let result = await getMascotasArray(userSessionM.Identificacion);
    if (result != {} && result.resultado == true) {
      listaMascotas = result.MascotasDB;
      await imprimirMascotas();
    }
    return listaMascotas;
}

 async function imprimirMascotas(){
    for(let i = 0; i < listaMascotas.length; i++){
        console.log(listaMascotas[i]);
        let perfiles = document.querySelector('.perfil-contenido');
        let mainDiv = document.createElement('div');
        let firstDiv = document.createElement('div');
        let secondDiv = document.createElement('div');
        let createP = document.createElement('p');
        let createButton = document.createElement('button');

        perfiles.appendChild(mainDiv);
        mainDiv.classList.add('box-usuario_img');
        mainDiv.classList.add('cards-mascotas');
        mainDiv.appendChild(firstDiv);
        firstDiv.classList.add('box-img');
        firstDiv.classList.add('border-radius');
        mainDiv.appendChild(secondDiv);
        secondDiv.classList.add('usuario');
        secondDiv.classList.add('border-radius');
        secondDiv.classList.add('name-mascota');
        secondDiv.appendChild(createP);
        createP.setAttribute('id', 'TxtMascotaM');
        createP.textContent = listaMascotas[i].NombreMascota;
        mainDiv.appendChild(createButton);
        createButton.classList.add('usuario');
        createButton.classList.add('border-radius');
        createButton.classList.add('annadir');
        createButton.textContent = 'Ver Perfil'
        createButton.addEventListener('click', function(){
            location.href = './perfilMascota.html?_id='+listaMascotas[i]._id;
        })


    }
}*/