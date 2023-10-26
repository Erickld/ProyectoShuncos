//Para validar el cupón "DESCUENTO10"
function aplicarCupon() {
    var cuponInput = document.getElementById("cupon-input");
    var cuponValue = cuponInput.value;

    // Validar si el cupón ingresado es "DESCUENTO10"
    if (cuponValue === "DESCUENTO10") {
        alert("Cupón válido. Se ha aplicado un descuento del 10%.");

    } else {
        alert("Cupón no válido. Introduce un código promocional válido.");
    }
}


// Para validar el Código Postal y el teléfono
function validarFormulario() {
    var cp = document.getElementById("cp-user").value;
    var phone = document.getElementById("phone-user").value;

    // Validación del código postal (5 dígitos numéricos)
    if (!/^\d{5}$/.test(cp)) {
        alert("Código Postal inválido. Debe contener 5 dígitos numéricos.");
        return;
    }

    // Validación del número de teléfono (10 dígitos numéricos)
    if (!/^\d{10}$/.test(phone)) {
        alert("Número de teléfono inválido. Debe contener 10 dígitos numéricos.");
        return;
    }

    // Si la validación pasa, enviar los datos al servidor o realizar otras acciones.
    alert("Formulario válido. Datos listos para enviar.");
}