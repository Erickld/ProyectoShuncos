
//Abrir carrito
function mostrarCarrito() {
    const cart = document.querySelector('.ventana-carrito');
    cart.classList.add('mostrar');

    añadirElementosCarrito();
    añadirListenersCarrito();
}

function añadirElementosCarrito () {
    const divContenidoCarrito = document.querySelector('.contenido-carrito');
    const carritoJSON = sessionStorage.getItem('carrito');
    const carritoTitulo = document.querySelector('.carrito-titulo');
    
    if(!carritoJSON) {
        carritoTitulo.innerText = 'Sin productos en el carrito';
        return;
    }

    const carrito = JSON.parse(carritoJSON);

    if(carrito.length === 0){
        carritoTitulo.innerText = 'Sin productos en el carrito';
        return;
    } else {  
        carritoTitulo.innerText = 'Prendas agregadas recientemente';
        
        carrito.forEach(producto => {
            if(divContenidoCarrito.children.length === 0){
                let elementoCarrito = crearElementoCarrito(producto);
                divContenidoCarrito.appendChild(elementoCarrito);
            } else {
                let productoRepetido = isElementoRepetido(producto, divContenidoCarrito);
                if(!productoRepetido) {
                    let elementoCarrito = crearElementoCarrito(producto);
                    divContenidoCarrito.appendChild(elementoCarrito); 
                }
            } 
        });
    }
}

function isElementoRepetido (producto) {
    let repetido = false;
    let productosEnCarrito = document.querySelectorAll(`[name = "${producto.id}"]`);

    productosEnCarrito.forEach((productoEnCarrito) => {
        if(productoEnCarrito) {
            if(productoEnCarrito.tallaElegida === producto.tallaElegida){
                repetido = true
            }
        }
    })

    return repetido;
}

function crearElementoCarrito (producto) {
    let elemento = document.createElement('div');
    elemento.tallaElegida = producto.tallaElegida;
    elemento.classList.add('carrito-box');
    elemento.setAttribute('name', `${producto.id}`)
    elemento.name = producto.id;
    // console.log(elemento);
    elemento.innerHTML = `
        <img src=${producto.imagen} alt="imagen carrito" class="carrito-img">
        <div class="detalles-box">
            <div class="titulo-producto-carrito">${producto.modelo}</div>
            <div class="precio-producto-carrito">$${producto.precio}</div>
            <div class="talla-producto-carrito">talla: ${producto.tallaElegida}</div>
            <span>
                <i class="bi bi-dash-square-fill minus-quantity" onclick="disminuirCantidad('${producto.id}')" prenda_id="${producto.id}"></i>
                <input type="text" value="1" class="cantidad-carrito" min="1" max="20" id="input-carrito-cantidad-${producto.id}" disabled>
                <i class="bi bi-plus-square-fill plus-quantity" onclick="incrementarCantidad('${producto.id}')" prenda_id="${producto.id}"></i>
            </span>
            
        </div>
        <!--Remover del carrito-->
        <i class="bi bi-trash-fill cart-remove"></i>
        
    `;
    return elemento;
}

function añadirListenersCarrito() {
    //Remover articulo del carrito
    var removerDelCarritoBoton = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removerDelCarritoBoton.length; i++) {
        var button = removerDelCarritoBoton[i]
        button.addEventListener('click', removerArticuloCarrito);
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
    const idEliminado =  buttonClicked.parentElement.name;
    let carritoJSON = sessionStorage.getItem('carrito');
    const carrito = JSON.parse(carritoJSON);

    for(let i = 0; i<carrito.length; i++) {
        if(carrito[i].id === idEliminado) {
            carrito.splice(i, 1);
            break;
        }
    }

    carritoJSON = JSON.stringify(carrito);
    sessionStorage.setItem('carrito', carritoJSON);

    buttonClicked.parentElement.remove();
    updateSubTotal();
    alerta('verde', 'artículo eliminado')
}

//Incrementar cantidad de prenda
function incrementarCantidad(idProduct) {
    let inputPrenda = document.getElementById('input-carrito-cantidad-'+idProduct);
    let valorActual = parseInt(inputPrenda.value);
    valorActual++;
    if (valorActual > 20) {
        inputPrenda.value = 20;
    } else {
        inputPrenda.value = valorActual;
    }
    updateSubTotal()
}

//Disminuir cantidad
function disminuirCantidad(idProduct) {
    let inputPrenda = document.getElementById('input-carrito-cantidad-'+idProduct);
    let valorActual = parseInt(inputPrenda.value);
    valorActual--;
    if (valorActual < 1) {
        inputPrenda.value = 1;
    } else {
        inputPrenda.value = valorActual;
    }
    updateSubTotal()
}

//Actualizar el total 
function updateSubTotal(){
    var carritoBoxes = document.getElementsByClassName('carrito-box');
    var subtotal = 0;
    
    for (var i = 0; i < carritoBoxes.length; i++) {
        var carritoBox = carritoBoxes[i];
        var precioElemento = carritoBox.querySelector('.precio-producto-carrito');
        var cantidadElemento = carritoBox.querySelector('.cantidad-carrito');
        var precio = parseFloat(precioElemento.innerText.replace("$", ""));
        var cantidad = cantidadElemento.value;
        subtotal = subtotal + (precio * cantidad);
    }
    document.querySelector('.subtotal-precio').innerText = "$" + subtotal;
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