//Abrir carrito
function mostrarCarrito() {
    cart = document.querySelector('.ventana-carrito');
    cart.classList.add('mostrar');
}

//Cerrar carrito
function ocultarCarrito() {
    cart = document.querySelector('.ventana-carrito');
    cart.classList.remove('mostrar');
}

//Carrito funcionando JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


function ready(){
    //Remover articulos del carrito
    var removerDelCarritoBoton = document.getElementsByClassName("cart-remove");
    console.log(removerDelCarritoBoton);
    for (var button of removerDelCarritoBoton) {
        button.addEventListener('click', removerArticuloCarrito);
    }
}

function removerArticuloCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
}
