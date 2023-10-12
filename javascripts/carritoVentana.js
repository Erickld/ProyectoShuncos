function mostrarCarrito() {
    cart = document.querySelector('.ventana-carrito');
    cart.classList.add('mostrar');

    hola = document.querySelector('.carrito-titulo');
    console.log(hola)
    hola.addEventListener('click', () => {
        console.log('hola!!!')
    })

}

function ocultarCarrito() {
    cart = document.querySelector('.ventana-carrito');
    cart.classList.remove('mostrar');
}