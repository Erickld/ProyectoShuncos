const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const messageInput = document.querySelector('#comment');
const formularioContacto = document.querySelector('#formulario-contacto');

formularioContacto.onsubmit = (event) => {
    event.preventDefault();
    validarFormulario();
}

function validarFormulario() {
    let correoValido = validarCorreo()
    let telefonoValido = validarTelefono()

    if(correoValido && telefonoValido){
        console.log("son validos")
        formularioContacto.submit()
    }
}

function validarCorreo () {
    const email = emailInput.value
    const regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    

    if(regEx.test(email)){
        emailInput.classList.remove("is-invalid")
        emailInput.classList.add("is-valid")
        return true
    } else {
        emailInput.classList.remove("is-valid")
        emailInput.classList.add("is-invalid")
        return false
    }
}

function validarTelefono() {
    let phone = phoneInput.value;

    if(isNaN(parseInt(phone))){
        phoneInput.classList.remove("is-valid")
        phoneInput.classList.add("is-invalid")
        return false
    } else {
        if(phone.length < 10 || phone.length > 10) {
            phoneInput.classList.remove("is-valid")
            phoneInput.classList.add("is-invalid")
            return false
        } else {
            phoneInput.classList.remove("is-invalid")
            phoneInput.classList.add("is-valid")
            return true
        }
    }  
}

