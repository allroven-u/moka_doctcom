'use strict';
let listaMascotas = [];
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


        if(listaMascotas[i].Activo === 1){
            console.log(listaMascotas[i]);
            let perfiles = document.querySelector('.perfil-contenido');
            let mainDiv = document.createElement('div');
            let firstDiv = document.createElement('div');
            let imgMascota = document.createElement('img');
            let secondDiv = document.createElement('div');
            let createP = document.createElement('p');
            let createButton = document.createElement('button');
    
            perfiles.appendChild(mainDiv);
            mainDiv.classList.add('box-usuario_img');
            mainDiv.classList.add('cards-mascotas');
            mainDiv.appendChild(firstDiv);
            firstDiv.classList.add('box-img');
            firstDiv.classList.add('border-radius');
            firstDiv.appendChild(imgMascota);
            imgMascota.classList.add('FotoPerfilUser');
            imgMascota.src = listaMascotas[i].Foto;
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
            createButton.textContent = 'Ver Perfil';
            createButton.addEventListener('click', function(){
                location.href = './perfilMascota.html?_id='+listaMascotas[i]._id;
            });
        }
        


    }
}
