document.addEventListener('DOMContentLoaded', obtenerProductos);

let formularioPayment = document.getElementById("form-payment");
let cuponAplicado = false;
let cuponActual = { codigo: "DESCUENTO10", porcentaje: 10, montoDescontado: 0};
let subtotalGlobal = 0;
let envioGlobal = 150;
let compraUnica;
let producto;
let productos;
let totalGlobal;



function obtenerProductos() {

    producto = sessionStorage.getItem('compraDirecta');

    if(!producto) {
        compraUnica = false;
        productos = sessionStorage.getItem('carrito');
        productos = JSON.parse(productos)
        subtotal = sessionStorage.getItem('subtotalCarrito')
        subtotalGlobal = parseFloat(subtotal);
        productos.forEach(producto => {
            console.log(producto.tallaElegida)
        })
        AsignarTotales();        
    } else {
        compraUnica = true;
        producto = JSON.parse(producto);
        subtotalGlobal = producto.precio;
        sessionStorage.removeItem('compraDirecta');
        AsignarTotales();
        console.log(generarListaProductos());
    }
}

function AsignarTotales() {
    document.getElementById("subtotal").textContent = `$ ${subtotalGlobal.toFixed(2)}`;
    document.getElementById("envio").textContent = `$ ${envioGlobal.toFixed(2)}`;
    totalGlobal = calcularTotal();
}

function calcularTotal() {
    let result = subtotalGlobal + envioGlobal;
    if (cuponAplicado) {
        result -= cuponActual.montoDescontado;
        console.log(result);
        console.log(cuponActual.montoDescontado);
    }
    document.getElementById("total").textContent = `$ ${result.toFixed(2)}`;
    return result; 
}

function showLoading(texto = "Cargando...") {
    document.getElementById('txt-loading').textContent = texto;
    document.querySelector('.loader-section').style.display = "flex";
    
}

function hideLoading() {
    document.querySelector('.loader-section').style.display = "none";
}

function inputInvalid(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

function inputValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}


function alerta(color, texto) {
    const toastLiveExample = document.getElementById('alerta-toast');
    const alertaTxt = document.getElementById('alerta-txt');

    if (color == "verde") {
        toastLiveExample.style.backgroundColor = "#56A35B"
        //toastLiveExample.style.boxShadow = "0 0 0 4px #56A35B"
    }

    if (color == "rosa") {
        toastLiveExample.style.backgroundColor = "#E4007C"
        //toastLiveExample.style.boxShadow = "0 0 0 4px #E4007C"
    }

    if (color == "azul") {
        toastLiveExample.style.backgroundColor = "#2173b4"
        //toastLiveExample.style.boxShadow = "0 0 0 4px #2173b4"
    }

    alertaTxt.textContent = texto;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
}



formularioPayment.onsubmit = async function(e) {
    e.preventDefault();
    let formularioValido = true;
    const regex3Digits = /^\d{3}$/;
    const regex5Digits = /^\d{5}$/;
    const regex10Digits = /^\d{10}$/;
    const regexCard = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;
    const regexVencimiento = /^(0[1-9]|1[0-2]) (\/) ([2-9][4-9])$/;

    //obteniendo inputs del formulario
    let nombreCompleto = document.getElementById('nombre-apellido');
    let pais = document.getElementById('pais');
    let estado = document.getElementById('estado');
    let ciudad = document.getElementById('ciudad');
    let colonia = document.getElementById('colonia');
    let calle = document.getElementById('calle');
    let cp = document.getElementById('cp');
    let telefono = document.getElementById('telefono');
    let indicacionesExtra = document.getElementById('indicaciones-extra');

    let subtotal = subtotalGlobal;
    let envio = envioGlobal;
    let total = calcularTotal();

    let numTarjeta = document.getElementById('num-tarjeta');
    let nameTitular = document.getElementById('name-titular');
    let vencimiento = document.getElementById('vencimiento');
    let cvc = document.getElementById('cvc');
    let aceptarTerminos = document.getElementById('aceptar-terminos');


    // console.log(nombreCompleto.value);
    // console.log(pais.value);
    // console.log(estado.value);
    // console.log(ciudad.value);
    // console.log(colonia.value);
    // console.log(calle.value);
    // console.log(cp.value);
    // console.log(telefono.value);
    // console.log(indicacionesExtra.value);

    // console.log(subtotal);
    // console.log(cuponAplicado);
    // console.log(cuponActual);
    // console.log(envio);
    // console.log(total);

    // console.log(numTarjeta.value);
    // console.log(nameTitular.value);
    // console.log(vencimiento.value);
    // console.log(cvc.value);
    // console.log(aceptarTerminos.checked);


    //Validando nombre del usuario
    if (nombreCompleto.value == "") {
        inputInvalid(nombreCompleto);
        formularioValido = false;
    } else {
        inputValid(nombreCompleto);
    }

    //Validando nombre de la ciudad
    if (ciudad.value == "") {
        inputInvalid(ciudad);
        formularioValido = false;
    } else {
        inputValid(ciudad);
    }

    //Validando nombre de la colonia
    if (colonia.value == "") {
        inputInvalid(colonia);
        formularioValido = false;
    } else {
        inputValid(colonia);
    }

    //Validando nombre de la calle
    if (calle.value == "") {
        inputInvalid(calle);
        formularioValido = false;
    } else {
        inputValid(calle);
    }

    //Validando el código postal
    if (!regex5Digits.test(cp.value)) {
        inputInvalid(cp);
        formularioValido = false;
    } else {
        inputValid(cp);
    }

    //Validando teléfono
    if (!regex10Digits.test(telefono.value)) {
        inputInvalid(telefono);
        formularioValido = false;
    } else {
        inputValid(telefono);
    }

    //Validando número de tarjeta
    if (!regexCard.test(numTarjeta.value)) {
        inputInvalid(numTarjeta);
        formularioValido = false;
    } else {
        inputValid(numTarjeta);
    }

    //Validando nombre del titular
    if (nameTitular.value == "") {
        inputInvalid(nameTitular);
        formularioValido = false;
    } else {
        inputValid(nameTitular);
    }

    //Validando fecha de vencimiento
    if (!regexVencimiento.test(vencimiento.value)) {
        inputInvalid(vencimiento);
        formularioValido = false;
    } else {
        inputValid(vencimiento);
    }

    //Validando cvc
    if (!regex3Digits.test(cvc.value)) {
        inputInvalid(cvc);
        formularioValido = false;
    } else {
        inputValid(cvc);
    }
    
    //Si el formulario en inválido se detiene la función
    if (!formularioValido){
        return;
    }

    if(!aceptarTerminos.checked) {
        return alerta("rosa", "Debes de aceptar los términos y condiciones para continuar.");
    }


    // guardar todo en objetos
    const infoDireccion = {
        nombreCompleto: nombreCompleto.value,
        pais: pais.value,
        estado: estado.value,
        ciudad: ciudad.value,
        colonia: colonia.value,
        calle: calle.value,
        cp: cp.value,
        telefono: telefono.value,
        indicacionesExtra: indicacionesExtra.value
    }
    const infoPrecios = {
        subtotal: subtotal,
        cuponAplicado: cuponAplicado,
        cuponActual: cuponActual,
        envio: envio,
        total: total
    }
    const infoPago = {
        numTarjeta: numTarjeta.value,
        nameTitular: nameTitular.value,
        vencimiento: vencimiento.value,
        cvc: cvc.value,
        aceptarTerminos: aceptarTerminos.checked
    }

    const listaProductos = []
    

    let orderDetails = {
        status: 0,
        has_coupon: cuponAplicado,
        coupon_percentage: cuponActual.porcentaje,
        coupon_text: cuponActual.codigo,
        discount_applied: cuponActual.montoDescontado,
        subtotal_price: subtotalGlobal.toFixed(2),
        shipment_price: envioGlobal.toFixed(2),
        total_price: totalGlobal.toFixed(2),
        country: infoDireccion.pais,
        state: infoDireccion.estado,
        city: infoDireccion.ciudad,
        colony: infoDireccion.colonia,
        street: infoDireccion.calle,
        zip_code: infoDireccion.cp,
        phone: infoDireccion.telefono,
        card_number: infoPago.numTarjeta,
        owner_name: infoPago.nameTitular,
        expiration_date: infoPago.vencimiento,
        pin: infoPago.cvc,
        user_id: JSON.parse(localStorage.getItem('currentUser')).id,
        lista_productos: generarListaProductos()
    }
    
    const peticion = async () => {
        const rawResponse = await fetch("http://localhost:8080/shuncos/orders", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderDetails)
        });
        const content = await rawResponse.json();
        console.log(content);
        sessionStorage.removeItem('carrito');
        setTimeout(() => {
            alerta("verde", "Pedido creado con éxito");
            hideLoading();
            window.location.href = "../html/profileUser.html";
        }, 3000);
    };
    
    showLoading();
    peticion();

    console.log(infoDireccion);
    console.log(infoPrecios);
    console.log(infoPago);

    

    
    

    
}

function generarListaProductos () {
    let listaProductos = [];

    if(compraUnica){
        let productoLista = {
            id: producto.id,
            size: producto.tallaElegida,
            quantity: parseInt(producto.cantidad)
        }

        listaProductos.push(productoLista);
    } else {
        productos.forEach(elemento => {
            let productoLista = {
                id: elemento.id,
                size: elemento.tallaElegida,
                quantity: parseInt(elemento.cantidad)
            }
            listaProductos.push(productoLista)
        })
    }

    return listaProductos;
}



//Para validar el cupón "DESCUENTO10"
function aplicarCupon() {
    let cuponInput = document.getElementById("cupon-input");
    let cuponValue = cuponInput.value;

    // Validar si el cupón ingresado es "DESCUENTO10"
    if (cuponValue === cuponActual.codigo && !cuponAplicado) {
        let cuponTxt = document.getElementById("cupon-txt");
        let cuponDescuento = document.getElementById("cupon-descuento");
        let descuento = subtotalGlobal*(cuponActual.porcentaje/100);
        cuponActual.montoDescontado = descuento;
        cuponAplicado = true;
        calcularTotal();
        cuponTxt.textContent = `${cuponActual.codigo} (${cuponActual.porcentaje}%)` ;
        cuponDescuento.textContent = `- $ ${descuento.toFixed(2)}`;
        document.querySelector('.cupon-price-div').style.display = "flex";
        cuponInput.value = "";
        return alerta("azul", `Cupón válido. Se ha aplicado un descuento del ${cuponActual.porcentaje}%.`);
    }

    //Validar si el cupón ya ha sido aplicado
    if(cuponValue === cuponActual.codigo && cuponAplicado){
        return alerta("rosa", "Este cupón ya ha sido aplicado a la orden.");
    } else {
        alerta("rosa", "Cupón inválido. Introduce un código promocional válido.");
    }
}




