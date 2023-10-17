//Abrir carrito
function mostrarCarrito() {
    cart = document.querySelector('.ventana-carrito');
    cart.classList.add('mostrar');
    var removerDelCarritoBoton = document.getElementsByClassName("remover-carrito");
    console.log(removerDelCarritoBoton);
    for (var i = 0; i < removerDelCarritoBoton.length; i++) {
        var button = removerDelCarritoBoton[i]
        button.addEventListener("click", removerArticuloCarrito);
    }
    //Cambios en la cantidad del carito
    var cantidadInputs = document.getElementsByClassName("cantidad-carrito")
    for (var i = 0; i < cantidadInputs.length; i++) {
        var input = cantidadInputs[i]
        input.addEventListener("change", cantidadCambiada)
    }
    //Agregar al carrito
    var agregarCarrito = document.getElementByClassName("add-cart")
    for (var i = 0; i < agregarCarrito.length; i++){
        var button = agregarCarrito[i]
        button.addEventListener("click", addCartClicked);
    }
    //Boton comprar funcionando
    document.getElementByClassName('comprar-ahora')[0].addEventListener("click", buyButtonClicked);
}
//Boton comprar
function buyButtonClicked(){
    alert("Tu orden está hecho");
    var contenidoCarrito = document.getElementsByClassName("contenido-carrito")[0]
    while (contenidoCarrito.hasChildNodes()){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    }
    updateTotal();
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
    updateTotal();
}

//Cambios en la cantidad del carrito
function cantidadCambiada(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal();
}

//Agregar al carrito
function addCartClicked(event){
    var button = event.target;
    var comprarProductos = button.parentElement;
    var titulo = comprarProductos.getElementByClassName("titulo-producto")[0].innerText;
    var precio = comprarProductos.getElementByClassName("precio-producto")[0].innerText;
    var productoImg = comprarProductos.getElementByClassName("producto-imagen")[0].src;
    agregarProductoAlCarrito(titulo, precio, productoImg);
    updateTotal();
}
function agregarProductoAlCarrito(titulo, precio, productoImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("carrito-box");
    var elementosCarrito = document.getElementsByClassName("contenido-carrito")[0];
    var elementosCarritoTitulos = elementosCarrito.getElementByClassName("titulo-producto-carrito");
    for (var i = 0; i < elementosCarritoTitulos.length; i++){
        alert("Ya agregaste este producto al carrito");
        return;
    }

    var cartBoxContent = `
                        <img src="${productoImg}" alt="" class="carrito-img">
                        <div class="detalles-box">
                            <div class="titulo-producto-carrito">${titulo}</div>
                            <div class="precio-producto-carrito">${precio}</div>
                            <input type="number" value="1" class="cantidad-carrito" min="1" max="20">
                        </div>

                        <!--Remover del carrito-->
                        <i class="bi bi-trash-fill remover-carrito"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementByClassName("remover-carrito")[0].addEventListener("click", removerArticuloCarrito);
    cartShopBox.getElementByClassName("cantidad-carrito")[0].addEventListener("change", cantidadCambiada);
}
//Actualizar el total 
function updateTotal(){
    var contenidoCarrito = document.getElementsByClassName("contenido-carrito")[0];
    var carritoBoxes = document.getElementsByClassName("carrito-box");
    var total = 0;
    for (var i = 0; i < carritoBoxes.length; i++) {
        var carritoBox = carritoBoxes[i];
        var precioElemento = carritoBox.getElementsByClassName("precio-producto-carrito")[0];
        var cantidadElemento = carritoBox.getElementsByClassName("cantidad-carrito")[0];
        var precio = parseFloat(precioElemento.innerText.replace("$", ""));
        var cantidad = cantidadElemento.value;
        total = total + (precio * cantidad);
    }
        //Si el precio contiene unidades de centavos
        total = Math.round(total * 100) / 100; 

        document.getElementsByClassName("total-precio")[0].innerText = "$" + total;
    
}

