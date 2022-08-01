const showPagar = document.getElementById('Pagar');
const modalPago = document.querySelector('.form-pago-tarjeta');
const closeModalPago = document.querySelector('.btn-cancerlar-tarjeta');
const overlay = document.querySelector('.overlay');



const hiddenPagar = function() {
    modalPago.classList.add('hidden');
    overlay.classList.add('hidden');
};

// start function show modal
function ShowModalPagoFunct() {
    modalPago.classList.remove('hidden');
    overlay.classList.remove('hidden');

    closeModalPago.addEventListener('click', hiddenPagar);
    overlay.addEventListener('click', hiddenPagar);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalPago.classList.contains('hidden')) {
            hiddenPagar();
        }
    });
};

showPagar.addEventListener('click', function() {
    ShowModalPagoFunct();
});