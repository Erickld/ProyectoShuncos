//Abrir carrito
function mostrarCarrito() {
    cart = document.querySelector('.ventana-carrito');
    cart.classList.add('mostrar');
    var removerDelCarritoBoton = document.getElementsByClassName('cart-remove');
    console.log(removerDelCarritoBoton);
    for (var i = 0; i < removerDelCarritoBoton.length; i++) {
        var button = removerDelCarritoBoton[i]
        button.addEventListener('click', removerArticuloCarrito);
    }
    //Cambios en la cantidad del carito
    var cantidadInputs = document.getElementsByClassName('cantidad-carrito')
    for (var i = 0; i < cantidadInputs.length; i++) {
        var input = cantidadInputs[i]
        input.addEventListener("change", cantidadCambiada)
    }
    updateSubTotal();
}

//Cerrar carrito
function ocultarCarrito() {
    cart = document.querySelector('.ventana-carrito');
    cart.classList.remove('mostrar');
}

//Remover articulos del carrito
function removerArticuloCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateSubTotal();
}

//Cambios en la cantidad del carrito
function cantidadCambiada(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateSubTotal();
}

//Actualizar el total 
function updateSubTotal(){
    var carritoBoxes = document.getElementsByClassName('carrito-box');
    var subtotal = 0;
    
    for (var i = 0; i < carritoBoxes.length; i++) {
        var carritoBox = carritoBoxes[i];
        var precioElemento = carritoBox.getElementsByClassName('precio-producto-carrito')[0];
        var cantidadElemento = carritoBox.getElementsByClassName('cantidad-carrito')[0];
        var precio = parseFloat(precioElemento.innerText.replace("$", ""));
        var cantidad = cantidadElemento.value;
        subtotal = subtotal + (precio * cantidad);
    }

    document.getElementsByClassName('subtotal-precio')[0].innerText = "$" + subtotal;
}