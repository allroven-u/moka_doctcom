"use strict";

let navBar = document.querySelector("#nav-bar");

window.addEventListener("scroll", function() {

    let logoNav = document.querySelector("#logo-nav");
    let navRight = document.querySelector(".nav-right");
    let body = document.querySelector('body');
    let navLeftIcon = document.querySelectorAll('.nav-line');

    body.classList.toggle('background-animation', window.scrollY > 0);
    navBar.classList.toggle("nav-bar-scroll", window.scrollY > 0);

    for (let i = 0; i < navLeftIcon.length; i++) {
        navLeftIcon[i].classList.toggle('nav-line-verdeagua', window.scrollY > 0);
    }



    if (window.scrollY > 0) {
        logoNav.setAttribute("src", "./assets/img/moka-logo.png");
    } else {
        logoNav.setAttribute("src", "./assets/img/moka-logo-blanco.png");
    };

    navRight.classList.toggle("nav-right-scroll", window.scrollY > 0);
});

const loginModal = document.querySelector('.lModal-form');
const signinModal = document.querySelector('.rModal-form');
const passwordModal = document.querySelector('.cModal-form');

const showModalLogin = document.querySelectorAll(".show-modal-login");
const showModalSignin = document.querySelectorAll(".show-modal-signin");


const closeModalLogin = document.querySelector('.lBtnCancelar');
const closeModalPassword = document.getElementById('cancelPassword');
const redirectModalPassword = document.querySelector(".redirect-modal-Password");
const redirectModalLogin = document.querySelector('.rBtnCancelar');
const redirectModalSiging = document.querySelector('.redirect-modal-sigin');
const overlay = document.querySelector('.overlay');
const general = document.querySelector('body');

function disableScroll() {
    window.scrollTo(0, 0);
}


///////////////// SHOW AND HIDE MODAL LOGIN ///////////////////////////////


for (let i = 0; i < showModalLogin.length; i++) {
    const hiddenModalLogin = function() {
        loginModal.classList.add('hidden');
        overlay.classList.add('hidden');
        window.removeEventListener('scroll', disableScroll);
    };

    // start function show modal
    var ShowModalLoginFunct = function() {
        loginModal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        location.href = "#top-page";
        window.addEventListener('scroll', disableScroll);

        // start function show modal
        function ShowModalSigninFunct() {
            signinModal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            location.href = "#top-page";
            window.addEventListener('scroll', disableScroll);
        }

        const hiddenModalPassword = function() {
            passwordModal.classList.add('hidden');
            overlay.classList.add('hidden');
            window.removeEventListener('scroll', disableScroll);
        };


        closeModalPassword.addEventListener('click', function() {
            hiddenModalPassword();
            ShowModalLoginFunct();
        });
        closeModalLogin.addEventListener('click', hiddenModalLogin);
        redirectModalSiging.addEventListener('click', function() {
            hiddenModalLogin();
            ShowModalSigninFunct();
        });
        overlay.addEventListener('click', hiddenModalLogin);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !loginModal.classList.contains('hidden')) {
                hiddenModalLogin();
            }
        });
    };

    showModalLogin[i].addEventListener('click', function() {
        ShowModalLoginFunct();
    });
};



///////////////////// SHOW MODAL SIGNIN AND HIDE CODE //////////////////
for (let i = 0; i < showModalSignin.length; i++) {
    const hiddenModalSignin = function() {
        signinModal.classList.add('hidden');
        overlay.classList.add('hidden');
        window.removeEventListener('scroll', disableScroll);
    };

    // start function show modal
    function ShowModalSigninFunct() {
        signinModal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        location.href = "#top-page";
        window.addEventListener('scroll', disableScroll);

        redirectModalLogin.addEventListener('click', function() {
            hiddenModalSignin();
            ShowModalLoginFunct();
        });
        overlay.addEventListener('click', hiddenModalSignin);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !signinModal.classList.contains('hidden')) {
                hiddenModalSignin();
            }
        });
    };

    showModalSignin[i].addEventListener('click', function() {
        ShowModalSigninFunct();
    });
}

///////////////// SHOW AND HIDE MODAL PASSWORD ///////////////////////////////

const hiddenModallogin = function() {
    loginModal.classList.add('hidden');
    overlay.classList.add('hidden');
    window.removeEventListener('scroll', disableScroll);
};

// start function show modal
function ShowModalPasswordFunct() {
    passwordModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    location.href = "#top-page";
    window.addEventListener('scroll', disableScroll);
}

redirectModalPassword.addEventListener('click', function() {
    hiddenModallogin();
    ShowModalPasswordFunct();
});
overlay.addEventListener('click', hiddenModallogin);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !hiddenModallogin.classList.contains('hidden')) {
        hiddenModallogin();
    }
});


//   showModalSignin[i].addEventListener('click', function () {
//     ShowModalSigninFunct();
//   });










let btnLeftNav = document.querySelector('.btn-leftNav');
let btnLeftNav2 = document.querySelector('.btn-leftNav2');
let navBarLeft = document.querySelector('#nav-bar-left');
let aboutRedi = document.querySelector('#about-redi');
let contactRedi = document.querySelector('#contact-redi');

function toggleMenu() {
    navBar.classList.toggle('hidden');
    navBarLeft.classList.toggle('hidden');
}

btnLeftNav.addEventListener('click', toggleMenu);
btnLeftNav2.addEventListener('click', toggleMenu);
aboutRedi.addEventListener('click', toggleMenu);
contactRedi.addEventListener('click', toggleMenu);


//LUIS S
let btnEnviarCorreo = document.getElementById("btn-contact")
btnEnviarCorreo.addEventListener('click', EnviarDatosCorreo)

let inputContName = document.getElementById("cont-name");
let inputContEmail = document.getElementById("cont-mail");
let inputContPhone = document.getElementById("cont-phone");
let inputContDescrip = document.getElementById("cont-descrip");

function EnviarDatosCorreo() {
    if (ValidarDatosContactenos() == true) {
        ConfirmarDatosLogin();
    }
}

function ValidarDatosContactenos() {
    let sContName = inputContName.value;
    let sContEmail = inputContEmail.value;
    let sContPhone = inputContPhone.value;
    let sContDescip = inputContDescrip.value;

    if (sContName == null || sContName == undefined || sContName == "") {
        resaltarInputInvalido("cont-name");
        MostrarErrorContactenos();
        return false;
    }

    if (sContEmail == null || sContEmail == undefined || sContEmail == "") {
        resaltarInputInvalido("cont-mail");
        MostrarErrorContactenos();
        return false;
    }

    if (sContPhone == null || sContPhone == undefined || sContPhone == "") {
        resaltarInputInvalido("cont-phone");
        MostrarErrorContactenos();
        return false;
    }

    if (sContDescip == null || sContDescip == undefined || sContDescip == "") {
        resaltarInputInvalido("cont-descrip");
        MostrarErrorContactenos();
        return false;
    }

    return true;
}

function MostrarErrorContactenos() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Dato Requerido!",
    });
}

function resaltarInputInvalido(pinputID) {
    var obj = document.getElementById(pinputID);
    var orig = obj.style;
    obj.style = 'border: 2px solid red; border-left: 10px solid var(--Rojo2);'

    setTimeout(function() {
        obj.style = orig;
    }, 5000);
}

function ConfirmarDatosLogin() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Datos Enviados!",
        showConfirmButton: false,
        timer: 1500,
    });
}