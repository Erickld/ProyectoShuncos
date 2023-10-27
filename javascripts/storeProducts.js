document.addEventListener('DOMContentLoaded', iniciarApp);

function iniciarApp () {
    obtenerProductos();
    agregarFuncionesBotones();
}

function obtenerProductos () {
    let arregloProductos = localStorage.getItem('productsList');
    arregloProductos = JSON.parse(arregloProductos);
    console.log(arregloProductos);
    arregloProductos.forEach(producto => {
        crearProducto(producto);
    })
}

function crearProducto (producto) {
    const aparador = document.querySelector('#aparador');
    const contenedor = document.createElement('div');
    let clases = ['col-md-3', 'p-4'];
    contenedor.classList.add(...clases);

    const tarjeta = crearTarjeta();
    const estructuraTarjeta = crearEstructura();
    const estructuraPoblada = poblarEstructura(estructuraTarjeta, producto);
    tarjeta.append(estructuraPoblada.divImagen, estructuraPoblada.divInfo);
    contenedor.appendChild(tarjeta);
    aparador.appendChild(contenedor);
}

function crearTarjeta () {
    const tarjeta = document.createElement('DIV');
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

    
    estructura.divImagen.classList.add('img-producto');
    estructura.divImagen.appendChild(estructura.imagen);
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