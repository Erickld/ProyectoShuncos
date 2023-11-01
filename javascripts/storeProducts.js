document.addEventListener('DOMContentLoaded', iniciarTienda);

function iniciarTienda () {
    obtenerProductos();
    agregarFuncionesBotones();
    añadirBotonesTarjetas();
}

function añadirBotonesTarjetas () {
    const tarjetas = document.querySelectorAll('.product-card');
    console.log(tarjetas);
    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener('click', crearModal);
    });
}

function crearModal(event) {
    const tarjeta = event.currentTarget;
    const divImg = tarjeta.children.namedItem('div-imgTarjeta');
    const img = divImg.firstElementChild; 
    console.log(img);

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
                    <h3 class="nombre-producto">Guayabera</h3>
                    <p class="descripcion">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur impedit amet nobis vel iusto similique esse commodi eaque omnis ex.</p>
                    <form class="formularioProductoModal" action="">
                        <legend>Talla</legend>
                        <fieldset>
                            <label for="talla">Escoja una talla</label>
                            <div class="talla-radio d-flex justify-content-around">
                                <div>
                                    <input type="radio" name="edad" value="adulto" id="pedido-talla-adulto">
                                    <label for="pedido-talla-adulto">Adulto</label>
                                </div>
                                <div>
                                    <input type="radio" name="edad" value="nino" id="pedido-talla-nino">
                                    <label for="pedido-talla-nino">Niño</label>
                                </div>
                                
                            </div>
                            <div class="tallas">

                            </div>
                        </fieldset>

                        <legend>Cantidad</legend>
                        <fieldset class="mb-3">
                            <label for="cantidad-producto">Cantidad</label>
                            <input type="number" name="" id="cantidad-producto">
                        </fieldset>

                        <div class="d-block d-md-flex justify-content-md-end my-3">
                            <button id="agregar-carrito" class="btn btn-dark" data-bs-dismiss="modal" type="button">Agregar al carrito</button>
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

    const modal_aux = new bootstrap.Modal(document.querySelector('#modal-producto'));
    modal_aux.show();  
}


function obtenerProductos () {
    let arregloProductos = localStorage.getItem('productsList');
    arregloProductos = JSON.parse(arregloProductos);
    arregloProductos.forEach(producto => {
        crearProducto(producto);
    })
}

function crearProducto (producto) {
    const aparador = document.querySelector('#aparador');
    const contenedor = document.createElement('div');
    let clases = ['col-md-3', 'p-4'];
    contenedor.classList.add(...clases);
    const id = producto.id;
    const salvarProducto = document.createElement('input');
    salvarProducto.setAttribute('type', 'text');
    salvarProducto.style.display= 'none';
    salvarProducto.value = producto;
    console.log(salvarProducto);

    const tarjeta = crearTarjeta(id);
    const estructuraTarjeta = crearEstructura();
    const estructuraPoblada = poblarEstructura(estructuraTarjeta, producto);
    tarjeta.append(estructuraPoblada.divImagen, estructuraPoblada.divInfo, salvarProducto);
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