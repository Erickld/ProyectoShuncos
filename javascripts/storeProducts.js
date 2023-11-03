document.addEventListener('DOMContentLoaded', iniciarTienda);

function iniciarTienda () {
    obtenerProductos();
    agregarFuncionesBotones();
    añadirBotonesTarjetas();
}

function añadirBotonesTarjetas () {
    const tarjetas = document.querySelectorAll('.product-card');
    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener('click', crearModal);
    });
}

function crearModal(event) {
    const tarjeta = event.currentTarget;
    let valoresProducto = tarjeta.children.namedItem('registro-producto').value;
    valoresProducto = JSON.parse(valoresProducto);
    const divImg = tarjeta.children.namedItem('div-imgTarjeta');
    const img = divImg.firstElementChild;
    

    const modal = document.createElement('div');
    modal.setAttribute('id', 'contenedor-modal');
    modal.innerHTML = `
    <div id="modal-producto" class="modal fade">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-center d-inline">Detalles del producto</h2>
                    <button data-bs-dismiss="modal" type="button" class="btn btn-close"></button>
                </div> <!--Modal Header-->

                <div class="modal-body">
                    <div class="img-producto">
                        <img src=${img.src} alt="imagen-produto" ">
                    </div>
                    <h3 class="nombre-producto">${valoresProducto.modelo}</h3>
                    <div class="descripcion-div">
                        <ul class="caracteristicas">
                            <li>
                                Color: ${valoresProducto.color}
                            </li>
                            <li>
                                Sexo: ${valoresProducto.sexo}
                            </li>
                            <li>
                                Tipo de manga: ${valoresProducto.tipo_manga}
                            </li>
                        <u/>
                    </div>
                    <form class="formularioProductoModal" action="">
                        <legend>Talla</legend>
                        <fieldset>
                        
                            <label for="talla">Escoja una talla</label>

                            <div id="tallas" class="row">

                            </div>

                        </fieldset>

                        <div class="d-block d-md-flex justify-content-md-around my-3">
                            <button id="modal-comprar" class="btn btn-dark"  type="button">Comprar</button>
                            <button id="agregar-carrito" class="btn btn-dark"  type="button">Agregar al carrito</button>
                        </div>
                        
                    </form> <!--Formulario para el modal-->
                </div> <!--Modal-body-->
            </div> <!--Div contenido del modal-->
        </div> <!--Modal Dialog-->
    </div> <!--Modal para el producto-->
    `;

    const body = document.querySelector('body');
    const modal_anterior = document.querySelector('#contenedor-modal');
    body.replaceChild(modal, modal_anterior);

    const modal_completo = new bootstrap.Modal(document.querySelector('#modal-producto'));
    modal_completo.show(); 
    
    AgregarTallas(tarjeta);
    añadirListenersModal(modal_completo, valoresProducto);
}


function obtenerProductos () {
    let arregloProductos = localStorage.getItem('productsList');
    arregloProductos = JSON.parse(arregloProductos);
    arregloProductos.forEach(producto => {
        crearProducto(producto);
    })
}

function crearProducto (producto) {
    const productoJSON = JSON.stringify(producto);
    const aparador = document.querySelector('#aparador');
    const contenedor = document.createElement('div');
    let clases = ['col-md-3', 'p-4'];
    contenedor.classList.add(...clases);
    const id = producto.id;
    const registroProducto = document.createElement('input');
    registroProducto.setAttribute('name', 'registro-producto');
    registroProducto.setAttribute('type', 'text');
    registroProducto.style.display= 'none';
    registroProducto.value = productoJSON;

    const tarjeta = crearTarjeta(id);
    const estructuraTarjeta = crearEstructura();
    const estructuraPoblada = poblarEstructura(estructuraTarjeta, producto);
    tarjeta.append(estructuraPoblada.divImagen, estructuraPoblada.divInfo, registroProducto);
    contenedor.appendChild(tarjeta);
    aparador.appendChild(contenedor);
}

function crearTarjeta (id) {
    const tarjeta = document.createElement('DIV');
    tarjeta.setAttribute('id', id);
    let clases = ['btn', 'product-card', 'product-hover'];
    tarjeta.classList.add(...clases);
    return tarjeta;
}

function crearEstructura () {
    let estructura = {
        divImagen : document.createElement('div'),
        imagen : document.createElement('img'),
        divInfo : document.createElement('div'),
        modelo : document.createElement('h2'),
        precio : document.createElement('p')
    }

    estructura.divImagen.setAttribute('name', 'div-imgTarjeta');
    estructura.divImagen.classList.add('img-producto');
    estructura.divImagen.appendChild(estructura.imagen);
    estructura.divInfo.setAttribute('name', 'div-infoTarjeta');
    let clases = ['info-producto', 'text-center'];
    estructura.divInfo.classList.add(...clases);
    estructura.divInfo.append(estructura.modelo, estructura.precio);
    estructura.modelo.classList.add('product-title');
    estructura.precio.classList.add('precio');

    return estructura;
}

function poblarEstructura (estructura, producto) {
    estructura.imagen.alt = 'imagen producto';
    estructura.imagen.src = producto.imagen_url;
    estructura.modelo.innerText = producto.modelo;
    estructura.precio.innerText = `$${producto.precio}`; 
    return estructura;
}


// EventListener para mostrar Toast al agregar al carrito

function agregarFuncionesBotones () {

    document.querySelector('#agregar-carrito').onclick = e => {
        e.preventDefault();

        // mostrar el toast
        const toastEl = document.querySelector('#toast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

}

function AgregarTallas (tarjeta) {
    const divTallas = document.querySelector('#tallas');
    let valoresProducto = tarjeta.children.namedItem('registro-producto').value;
    valoresProducto = JSON.parse(valoresProducto);
    const tallas = valoresProducto.tallas;
    
    tallas.forEach( talla => {
        const divTalla = document.createElement('div');
        let estructura = crearEstructuraTalla();
        let estructuraPoblada = poblarEstructuraTalla(estructura, talla);

        divTalla.append(estructura.radio, estructura.label);
        divTallas.appendChild(divTalla);
    })
}

function crearEstructuraTalla () {
    const estructura = {
        radio : document.createElement('input'),
        label : document.createElement('label')
    };

    estructura.radio.id = "talla";
    estructura.radio.type = "radio";
    estructura.radio.name = "talla";


 
    estructura.label.id = 'label-radio'; 
    estructura.label.classList.add('label-radio');
    estructura.label.setAttribute('for', 'talla');

    return estructura;
}

function poblarEstructuraTalla (estructura, talla) {
    estructura.radio.value = talla;
    estructura.label.innerText = talla;

    return estructura;
}

function añadirListenersModal (modal, producto) {
    const btnComprar = document.querySelector('#modal-comprar');
    const btnCarrito = document.querySelector('#agregar-carrito');

    btnComprar.addEventListener('click', (event) => {
        realizarCompra(modal)
    });
    btnCarrito.addEventListener('click', (event) => {
        agregarAlCarrito(modal, producto)
    });
}

function realizarCompra (modal) {
    let talla = obtenerTalla();

    if(!talla) {
        alerta('rosa', 'por favor elija una talla');
        return;
    }

    modal.hide();
    window.open('./Payment.html', '_blank');
}

function agregarAlCarrito (modal, producto) {

    let carrito = sessionStorage.getItem('carrito');
    let talla = obtenerTalla();

    if(!talla) {
        alerta('rosa', 'por favor elija una talla');
        return;
    }

    let productoCarrito = {
        id: producto.id,
        imagen: producto.imagen_url,
        modelo: producto.modelo,
        tallaElegida: talla,
        color: producto.color,
        precio: producto.precio
    }
    

    if(!carrito) {
        carrito = [];
        carrito.push(productoCarrito);
        let carritoJSON = JSON.stringify(carrito);
        sessionStorage.setItem('carrito', carritoJSON);
        modal.hide();
        alerta('verde', 'Elemento agregado al carrito');
    } else {
        carrito = JSON.parse(carrito);
        let repetido = isRepetido(productoCarrito, carrito);

        if(!repetido) {
            carrito.push(productoCarrito);
            carrito = JSON.stringify(carrito);
            sessionStorage.setItem('carrito', carrito);
            modal.hide();
            alerta('verde', 'Elemento agregado al carrito');
        } else {
            alerta('rosa', 'El elemento ya se encuentra en el carrito');
        }
        
    }
}


function obtenerTalla () {
    let tallas = document.querySelectorAll('input[name = "talla"]')
    let tallaElegida;
    tallas.forEach( talla => {
        if(talla.checked) {
            tallaElegida = talla.value;
        }
    })
    return tallaElegida;
}

function isRepetido (productoCarrito, carrito) {
    let isRepetido = false;

    carrito.forEach(producto => {
        if(productoCarrito.id === producto.id && productoCarrito.tallaElegida == producto.tallaElegida) {
            isRepetido = true;
        }
    });

    return isRepetido;
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