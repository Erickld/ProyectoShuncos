let arrProductos = localStorage.getItem('productsList');

if (arrProductos) {
    arrProductos = JSON.parse(arrProductos);
    arrProductos.forEach(prod => {
        crearFila(prod);
    });
} else {
    arrProductos = [];
    localStorage.setItem('productsList', JSON.stringify(arrProductos));
}

//Variables globales
let arrTallasNino = [];
let arrTallasAdulto = [];
let formularioCreacion = document.getElementById("form-create");
let formularioEdicion = document.getElementById("form-edit");
let currentProductId = ""; 


//Funcion que inicia tooltips de bootstrap
function updateTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function mostrarTallas(tipo) {
    let tallasNinos = document.getElementsByClassName('nino');
    let tallasAdulto = document.getElementsByClassName('adulto');
    for (let talla of tallasNinos) {
        talla.style.display = (tipo == 'adulto') ? 'none' : 'block';
    }
    for (let talla of tallasAdulto) {
        talla.style.display = (tipo == 'adulto') ? 'block' : 'none';
    }
}

function addTalla(tipo, talla) {
    talla = parseInt(talla);
    let array = (tipo == 'adulto') ? arrTallasAdulto : arrTallasNino;

    if (array.includes(talla)) {
        array = array.filter(x => x != talla);
    } else {
        array.push(talla);
    }

    array.sort((a, b) => a-b);

    if (tipo == 'adulto') {
        arrTallasAdulto = array;
    } else {
        arrTallasNino = array;
    }
}

function negativePrice (event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
}

//Evitar precios negativos
document.getElementById("precio").addEventListener("change", negativePrice);

function inputInvalid(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

function inputValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function cerrarModal(modalId) {
    const myModal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    myModal.hide();
}


function getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
        reader.addEventListener('load', () => {
            resolve(reader.result);
        });
    });
}

function setImagen (idProd) {
    let product = arrProductos.find(prod => prod.id == idProd);
    const newImage = document.getElementById('imagen-de-proucto');
    newImage.src = product.imagen_url;
}

function confirmDelete (idProd) {
    currentProductId = idProd;
    const texto = document.getElementById('txt-confirm-delete');
    texto.textContent = `¿ Deseas elimiar el producto ${idProd} ?`;
}

function crearFila(prod) {
    let tabla = document.getElementById('body-tabla');
    let newRow = document.createElement('tr');
    newRow.id = prod.id;

    newRow.innerHTML = `
        <th scope="row">${prod.id}</th>
        <td>
            <span data-bs-toggle="modal" data-bs-target="#modalImg">
                <i onclick="setImagen('${prod.id}')" class="bi bi-image icon-img" data-bs-custom-class="custom-tooltip-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Mostrar Imagen"></i>
            </span>
        </td>
        <td>${prod.modelo}</td>
        <td><b>${prod.talla_adulto ? 'Tallas de adulto:' : 'Tallas de niño:'}</b><br>${prod.tallas.join(", ")}</td>
        <td><b>Sexo:</b> ${prod.sexo}<br><b>Tipo de manga:</b> ${prod.tipo_manga}<br><b>Color:</b> ${prod.color}</td>
        <td>$ ${prod.precio} MXN</td>
        <td>
            <span data-bs-toggle="modal" data-bs-target="#modalEdit">
                <i onclick="setInfoProduct('${prod.id}')" class="bi bi-pencil-square icon-edit" data-bs-custom-class="custom-tooltip-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar Producto"></i>
            </span>
            <span data-bs-toggle="modal" data-bs-target="#modalDelete">
                <i onclick="confirmDelete('${prod.id}')" class="bi bi-trash3-fill icon-delete" data-bs-custom-class="custom-tooltip-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar Producto"></i>
            </span>
        </td>
    `
    tabla.appendChild(newRow);

    //se actualizan estilos tooltips
    updateTooltips();
}


function resetFormularioCreacion () {
    formularioCreacion.reset();
    document.querySelector('.error-talla').style.display = 'block';
    document.getElementById('name-modelo').classList.remove('is-valid', 'is-invalid');
    document.getElementById('img-prod').classList.remove('is-valid', 'is-invalid');
    document.getElementById("precio").classList.remove('is-valid', 'is-invalid');
    arrTallasNino = [];
    arrTallasAdulto = [];
    mostrarTallas('adulto');
}


//Creacion de producto
formularioCreacion.onsubmit = async function(e) {
    e.preventDefault();
    let formularioValido = true;
    
    //obteniendo inputs del formulario
    let modelo = document.getElementById('name-modelo');
    let imagen = document.getElementById('img-prod');
    let manga = document.getElementById("tipo-manga");
    let sexo = document.getElementById("sexo");
    let tallaAdulto = document.getElementById("talla-adulto");
    let color = document.getElementById("color");
    let precio = document.getElementById("precio");
    
    //obteniendo informacion del archivo cargado en el input para subir imagenes
    let img = imagen.files[0];

    let errorTalla = document.querySelector('.error-talla');

    //Validando input de modelo
    if (modelo.value == "") {
        inputInvalid(modelo);
        formularioValido = false;
    } else {
        inputValid(modelo);
    }
    
    //Validando si existe un archivo de imagen
    if (img) {
        
        //obtenemos la extensión de la imagen
        let extensionImg = img.name.split('.').pop();
        extensionImg = extensionImg.toLowerCase();
        //validamos que la imagen tenga una extension png, jpg o jpeg
        if(["png", "jpg", "jpeg"].includes(extensionImg)) {
            inputValid(imagen);
        } else {
            inputInvalid(imagen);
            formularioValido = false;
        }

    } else {
        inputInvalid(imagen);
        formularioValido = false;
    }

    //Validando la seleccion de tallas de adulto / niño
    if ((tallaAdulto.checked && arrTallasAdulto.length == 0) || (!tallaAdulto.checked && arrTallasNino.length == 0)) {
        errorTalla.style.display = 'block';
        formularioValido = false;
    } else {
        errorTalla.style.display = 'none';
    }

    //Validando input de precio
    if ( isNaN(precio.value) || precio.value <= 0) {
        inputInvalid(precio);
        formularioValido = false;
    } else {
        inputValid(precio);
    }

    //Si el formulario en inválido se detiene la función
    if (!formularioValido){
        return
    }

    //Creamos un objeto para guardarlo en local storage
    let producto = {
        id: "",
        modelo: modelo.value,
        imagen_url: "",
        tipo_manga: manga.value,
        sexo: sexo.value,
        talla_adulto: tallaAdulto.checked,
        tallas: tallaAdulto.checked ? arrTallasAdulto: arrTallasNino,
        color: color.value,
        precio: parseFloat(precio.value)
    }

    //Se asigna un id random al producto
    const ID = (Math.random() + 1).toString(36).substring(5);
    producto.id = ID;

    try {
        //Se convierte el archivo de la imagen a una cadena de texto
        const imgData = await getBase64(img);
        //Se almacena la informacion de la imagen en producto
        producto.imagen_url = imgData;
        //Se almacena producto en localStorage
        arrProductos.push(producto);
        localStorage.setItem('productsList', JSON.stringify(arrProductos));
    } catch (error) {
        return console.log(error)
    }
    
    //crear nuevo row en tabla
    crearFila(producto)
    cerrarModal('modalCreate');


}

//Eliminación de producto
document.getElementById('delete-product').addEventListener('click', () => {
    arrProductos = arrProductos.filter(prod => prod.id != currentProductId);
    localStorage.setItem('productsList', JSON.stringify(arrProductos));
    let productRow = document.getElementById(currentProductId);
    productRow.remove();
    cerrarModal('modalDelete');
})



//Buscar producto por nombre del modelo
document.getElementById('buscar-btn').addEventListener('click', () => {
    let tabla = document.getElementById('body-tabla');
    let search = document.getElementById('buscar-input');
    tabla.innerHTML = "";
    if (search.value == "") {
        arrProductos.forEach(prod => {
            crearFila(prod);
        });
    } else {
        arrProductos.forEach(prod => {
            const modeloTxt = prod.modelo.toLowerCase();
            const busquedaTxt = search.value.toLowerCase();
            if (modeloTxt.includes(busquedaTxt)) {
                crearFila(prod);
            }
        });
    }
})

//Realizar busqueda al presionar enter
document.getElementById("buscar-input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        document.getElementById("buscar-btn").click();
    }
});


function showImgInput () {
    let changeImg = document.getElementById('change-img');
    if (changeImg.checked) {
        document.querySelector('.edit-imagen').style.display = 'block';
    } else {
        document.querySelector('.edit-imagen').style.display = 'none';
    }
}

//Establece valores del producto en cuestión
function setInfoProduct(idProd) {
    currentProductId = idProd;
    let producto = arrProductos.find(prod => prod.id == idProd);
    formularioEdicion.reset();
    document.querySelector('.error-talla-e').style.display = 'none';
    document.querySelector('.edit-imagen').style.display = 'none';
    arrTallasNino = [];
    arrTallasAdulto = [];

    document.getElementById('name-modelo-e').classList.remove('is-valid', 'is-invalid');
    document.getElementById('img-prod-e').classList.remove('is-valid', 'is-invalid');
    document.getElementById("precio-e").classList.remove('is-valid', 'is-invalid');

    //obteniendo inputs del formulario de edición
    let modeloEdit = document.getElementById('name-modelo-e');
    let mangaEdit = document.getElementById("tipo-manga-e");
    let sexoEdit = document.getElementById("sexo-e");
    let tallaAdultoEdit = document.getElementById("talla-adulto-e");
    let tallaNinoEdit = document.getElementById("talla-nino-e");
    let colorEdit = document.getElementById("color-e");
    let precioEdit = document.getElementById("precio-e");

    //Mostrando los valores actuales del producto
    modeloEdit.value = producto.modelo;
    mangaEdit.value = producto.tipo_manga;
    sexoEdit.value = producto.sexo;
    tallaAdultoEdit.checked = producto.talla_adulto;
    colorEdit.value = producto.color;
    precioEdit.value = producto.precio;

    let tipoTalla = "";
    
    //Estableciendo el tipo de talla seleccionado
    if (tallaAdultoEdit.checked) {
        tallaNinoEdit.checked = false;
        arrTallasAdulto = producto.tallas;
        tipoTalla = 'adulto';
        
    } else {
        tallaNinoEdit.checked = true;
        arrTallasNino = producto.tallas;
        tipoTalla = 'nino';
    }

    //Mostrando las tallas en cuestión
    mostrarTallas(tipoTalla);

    //Haciendo check en los inputs de las tallas correspondientes
    producto.tallas.forEach(talla => {
        tallaInput = document.getElementById(`${tipoTalla}-t${talla}-e`);
        tallaInput.checked = true;
    })
}


//Edicion de producto
formularioEdicion.onsubmit = async function(e) {
    e.preventDefault();

    let formularioValido = true;
    
    //obteniendo inputs del formulario
    let modeloEdit = document.getElementById('name-modelo-e');
    let mangaEdit = document.getElementById("tipo-manga-e");
    let sexoEdit = document.getElementById("sexo-e");
    let tallaAdultoEdit = document.getElementById("talla-adulto-e");
    let colorEdit = document.getElementById("color-e");
    let precioEdit = document.getElementById("precio-e");
    
    let cambiarImagen = document.getElementById('change-img');
    let errorTallaEdit = document.querySelector('.error-talla-e');
    let imagenEdit = document.getElementById('img-prod-e');

    //obteniendo informacion del archivo cargado en el input para subir imagenes
    img = imagenEdit.files[0];

    //Validando input de modelo
    if (modeloEdit.value == "") {
        inputInvalid(modeloEdit);
        formularioValido = false;
    } else {
        inputValid(modeloEdit);
    }

    //Si se cambia la imagen
    if(cambiarImagen.checked) {

        //Validando si existe un archivo de imagen
        if (img) {
            //obtenemos la extensión de la imagen
            let extensionImg = img.name.split('.').pop();
            extensionImg = extensionImg.toLowerCase();
            //validamos que la imagen tenga una extension png, jpg o jpeg
            if(["png", "jpg", "jpeg"].includes(extensionImg)) {
                inputValid(imagenEdit);
            } else {
                inputInvalid(imagenEdit);
                formularioValido = false;
            }
    
        } else {
            inputInvalid(imagenEdit);
            formularioValido = false;
        }
    }


    //Validando la seleccion de tallas de adulto / niño
    if ((tallaAdultoEdit.checked && arrTallasAdulto.length == 0) || (!tallaAdultoEdit.checked && arrTallasNino.length == 0)) {
        errorTallaEdit.style.display = 'block';
        formularioValido = false;
    } else {
        errorTallaEdit.style.display = 'none';
    }

    //Validando input de precio
    if ( isNaN(precioEdit.value) || precioEdit.value <= 0) {
        inputInvalid(precioEdit);
        formularioValido = false;
    } else {
        inputValid(precioEdit);
    }

    //Si el formulario en inválido se detiene la función
    if (!formularioValido){
        return
    }

    //Editamos los valores del producto en cuestión
    arrProductos.forEach(prod => {
        if (prod.id == currentProductId) {
            prod.modelo = modeloEdit.value;
            prod.tipo_manga = mangaEdit.value;
            prod.sexo = sexoEdit.value,
            prod.talla_adulto = tallaAdultoEdit.checked,
            prod.tallas = tallaAdultoEdit.checked ? arrTallasAdulto: arrTallasNino,
            prod.color = colorEdit.value,
            prod.precio = parseFloat(precioEdit.value)
        }
    });


    if (cambiarImagen.checked) {
        try {
            //Se convierte el archivo de la imagen a una cadena de texto
            const imgData = await getBase64(img);
            //Editamos la imagen del producto en cuestión
            arrProductos.forEach(prod => {
                if (prod.id == currentProductId) {
                    //Se almacena la informacion de la nueva imagen del producto
                    prod.imagen_url = imgData;
                }
            });            
            //Se almacena actualizacion en localStorage
            localStorage.setItem('productsList', JSON.stringify(arrProductos));
            document.getElementById("buscar-btn").click();

        } catch (error) {
            return console.log(error)
        }
    
    } else {
        //Se almacena actualizacion en localStorage
        localStorage.setItem('productsList', JSON.stringify(arrProductos));
        document.getElementById("buscar-btn").click();
    }

    cerrarModal('modalEdit');
}