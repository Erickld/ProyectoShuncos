const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const messageInput = document.querySelector('#comment');
const formularioContacto = document.querySelector('#formularioContacto');

formularioContacto.onsubmit = (event) => {
    event.preventDefault();
    validarFormulario();
}

function validarFormulario() {
    let email = emailInput.value
    const regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
 
    if(regEx.test(email)){
        alert("Correo correcto")
    } else {
        alert("correo incorrecto")
    }

    let phone = phoneInput.value;

    if(isNaN(parseInt(phone))){
        alert("Solo se permiten numeros en el telefóno");
    } else {
        if(phone.length < 10 || phone.length > 10) {
            alert("Tamaño incorrecto")
        } else {
            alert("El numero es correcto");
        }
    }

    

}

