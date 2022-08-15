'use strict';
let txtUsuarioLogueado2 = document.getElementById('TxtUsuarioLogueado2');
let txtNombreP = document.getElementById('txtNombreP');
let txtApellidosP = document.getElementById('txtApellidosP');
let txtCedulaP = document.getElementById('txtCedulaP');
let txtEmailP = document.getElementById('txtEmailP');
let txtUsuarioP = document.getElementById('txtUsuarioP');
let txtContraseniaP = document.getElementById('txtContraseniaP');
let txtDireccionP = document.getElementById('txtDireccionP');
// luis
const showPagar = document.getElementById('ver_metodo_pago');
const modalPago = document.querySelector('.form-pago-tarjeta12345');
const modalPago2 = document.querySelector('.form-pago-tarjeta2');
const closeModalPago = document.querySelector('.btn-cancerlar-tarjeta');
const closeModalPago2 = document.querySelector('.btn2-cancerlar-tarjeta');
const overlay1 = document.querySelector('.overlay1');
const overlay2 = document.querySelector('.overlay2');
const agregar_tarjeta = document.querySelector('.btn-pago-tarjeta2');
const clicktarjeta1 = document.getElementById('tarjeta1');
const clicktarjeta2 = document.getElementById('tarjeta2');
const clicktarjeta3 = document.getElementById('tarjeta3');
const clicktarjeta4 = document.getElementById('tarjeta4');


const modal2AgregarTar1 = document.getElementById('btnPagar1');
const modal2AgregarTar2 = document.getElementById('btnPagar2');
const modal2AgregarTar3 = document.getElementById('btnPagar3');
const modal2AgregarTar4 = document.getElementById('btnPagar4');
const espacio1 = document.getElementById('espacio1');
const espacio2 = document.getElementById('espacio2');
const espacio3 = document.getElementById('espacio3');
const espacio4 = document.getElementById('espacio4');


espacio1.addEventListener('click', function() {
    hiddenPagar();
    ShowModalPagoFunct2();
    modal2AgregarTar1.classList.remove('hidden');
    modal2AgregarTar2.classList.add('hidden');
    modal2AgregarTar3.classList.add('hidden');
    modal2AgregarTar4.classList.add('hidden');
});

espacio2.addEventListener('click', function() {
    hiddenPagar();
    ShowModalPagoFunct2();
    modal2AgregarTar1.classList.add('hidden');
    modal2AgregarTar2.classList.remove('hidden');
    modal2AgregarTar3.classList.add('hidden');
    modal2AgregarTar4.classList.add('hidden');
});

espacio3.addEventListener('click', function() {
    hiddenPagar();
    ShowModalPagoFunct2();
    modal2AgregarTar1.classList.add('hidden');
    modal2AgregarTar2.classList.add('hidden');
    modal2AgregarTar3.classList.remove('hidden');
    modal2AgregarTar4.classList.add('hidden');
});

espacio4.addEventListener('click', function() {
    hiddenPagar();
    ShowModalPagoFunct2();
    modal2AgregarTar1.classList.add('hidden');
    modal2AgregarTar2.classList.add('hidden');
    modal2AgregarTar3.classList.add('hidden');
    modal2AgregarTar4.classList.remove('hidden');
});


modal2AgregarTar1.addEventListener('click', function() {
    espacio1.classList.add('hidden');
    FunctionAgregarTarjeta1();
});

clicktarjeta1.addEventListener('click', function() {
    espacio1.classList.remove('hidden');
    FunctionRemoverTarjeta1();
});

function FunctionRemoverTarjeta1() {
    var x = document.getElementById("tarjeta1");
    if (x.style.display === "none") {
      x.classList.add('hidden');
    } else {
      x.classList.add('hidden');
    }
  }

function FunctionAgregarTarjeta1() {
    hiddenPagar2();
    ShowModalPagoFunct();

    var x = document.getElementById("tarjeta1");
    if (x.style.display === "block") {
      x.classList.add('hidden');
    } else {
      x.classList.remove('hidden');
    }
  }







clicktarjeta2.addEventListener('click', function() {
    espacio2.classList.remove('hidden');
    FunctionRemoverTarjeta2();
});

function FunctionRemoverTarjeta2() {
    var x = document.getElementById("tarjeta2");
    if (x.style.display === "none") {
      x.classList.add('hidden');
    } else {
      x.classList.add('hidden');
    }
  }
  
modal2AgregarTar2.addEventListener('click', function() {
    espacio2.classList.add('hidden');
    FunctionAgregarTarjeta2();
});

function FunctionAgregarTarjeta2() {
    hiddenPagar2();
    ShowModalPagoFunct();

    var x = document.getElementById("tarjeta2");
    if (x.style.display === "block") {
      x.classList.add('hidden');
    } else {
      x.classList.remove('hidden');
    }
  }







clicktarjeta3.addEventListener('click', function() {
    espacio3.classList.remove('hidden');
    FunctionRemoverTarjeta3();
});

function FunctionRemoverTarjeta3() {
    var x = document.getElementById("tarjeta3");
    if (x.style.display === "none") {
      x.classList.add('hidden');
    } else {
      x.classList.add('hidden');
    }
  }
  
modal2AgregarTar3.addEventListener('click', function() {
    espacio3.classList.add('hidden');
    FunctionAgregarTarjeta3();
});

function FunctionAgregarTarjeta3() {
    hiddenPagar2();
    ShowModalPagoFunct();

    var x = document.getElementById("tarjeta3");
    if (x.style.display === "block") {
      x.classList.add('hidden');
    } else {
      x.classList.remove('hidden');
    }
  }







clicktarjeta4.addEventListener('click', function() {
    espacio4.classList.remove('hidden');
    FunctionRemoverTarjeta4();
});

function FunctionRemoverTarjeta4() {
    var x = document.getElementById("tarjeta4");
    if (x.style.display === "none") {
      x.classList.add('hidden');
    } else {
      x.classList.add('hidden');
    }
  }
  
modal2AgregarTar4.addEventListener('click', function() {
    espacio4.classList.add('hidden');
    FunctionAgregarTarjeta4();
});

function FunctionAgregarTarjeta4() {
    hiddenPagar2();
    ShowModalPagoFunct();

    var x = document.getElementById("tarjeta4");
    if (x.style.display === "block") {
      x.classList.add('hidden');
    } else {
      x.classList.remove('hidden');
    }
  }



const hiddenPagar = function() {
    modalPago.classList.add('hidden');
    overlay1.classList.add('hidden');
};

const hiddenPagar2 = function() {
    modalPago2.classList.add('hidden');
    overlay2.classList.add('hidden');
};

function ShowModalPagoFunct() {

    modalPago.classList.remove('hidden');
    overlay1.classList.remove('hidden');

    closeModalPago.addEventListener('click', hiddenPagar);
    overlay1.addEventListener('click', hiddenPagar);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalPago.classList.contains('hidden')) {
            hiddenPagar();
        }
    });
};

function ShowModalPagoFunct2() {

    modalPago2.classList.remove('hidden');
    overlay2.classList.remove('hidden');

    overlay2.addEventListener('click', hiddenPagar2);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalPago2.classList.contains('hidden')) {
            hiddenPagar2();
        }
    });
};

showPagar.addEventListener('click', function() {
    ShowModalPagoFunct();
});


closeModalPago2.addEventListener('click', function() {
    hiddenPagar2();
    ShowModalPagoFunct();
});

window.addEventListener('load', () => {
    let usuario = GetSesion();
    console.log(usuario.Identificacion);
    txtUsuarioLogueado2.textContent = usuario.Nombre + ' ' + usuario.Apellido1;
    txtNombreP.textContent = usuario.Nombre;
    txtApellidosP.textContent = usuario.Apellido1 + " " + usuario.Apellido2;
    txtEmailP.textContent = usuario.Email;
    txtUsuarioP.textContent = usuario.Usuario;
    txtContraseniaP.textContent = "*********";
    txtDireccionP.textContent = usuario.Direccion;
    txtCedulaP.textContent = usuario.Identificacion;

    cargaJsonCitas();
    cargaJson();
    setTimeout(() => { ImprimirListaCitas(); }, 1000);
});

function ImprimirListaCitas() {
    let tbody = document.getElementById('tbbody-ultimas-citas');

    let listaCitas = getCitasArray();

    console.log(listaCitas);

    tbody.innerHTML = '';

    for (let i = 0; i < listaCitas.length; i++) {

        let cita = listaCitas[i];
        let veterinario = buscaUsuarioID(cita.IdentificacionVeterinario);

        let fila = tbody.insertRow();
        let celdaMascota = fila.insertCell();
        let celdaVeterinario = fila.insertCell();
        let celdaFecha = fila.insertCell();

        celdaMascota.innerHTML = cita.NombreMascota;
        celdaMascota.classList.add('h-citas');
        celdaVeterinario.innerHTML = veterinario.Nombre + ' ' + veterinario.Apellido1;
        celdaVeterinario.classList.add('h-citas');
        celdaFecha.innerHTML = cita.FechaHora;
        celdaFecha.classList.add('h-citas');
    };

};
