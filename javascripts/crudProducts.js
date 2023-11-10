// let jsonx = {
//     status: 5,
//     has_coupon: true,
//     coupon_percentage: 0.5,
//     coupon_text: "holaMundo",
//     discount_applied: 255,
//     subtotal_price: 1200.00.toFixed(2),
//     shipment_price: 150.55.toFixed(2),
//     total_price: 100.88.toFixed(2),
//     country: "Mexico",
//     state: "Guerrero",
//     city: "CDMX",
//     colony: "colonia",
//     street: "street",
//     zip_code: "zip code",
//     phone: "phone",
//     card_number: "1111 1111 1111 1111",
//     owner_name: "nombre de usuario",
//     expiration_date: "02 / 24",
//     pin: "789",
//     user_id: 1,
//     lista_productos: [
//         {
//             id: 2,
//             size: 50,
//             quantity: 10
//         },
//         {
//             id: 1,
//             size: 80,
//             quantity: 20
//         }
//     ]
// }

// async function funcionCrearUser() {
//     const rawResponse = await fetch("http://localhost:8080/shuncos/orders", {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(jsonx)
//     });
//     const content = await rawResponse.json();
//     console.log(content);

// }

// funcionCrearUser();
















let arrProductos;
obtenerProductsDB();

// if (arrProductos) {
//     arrProductos = JSON.parse(arrProductos);
//     arrProductos.forEach(prod => {
//         //crearFila(prod);
//     });

// } else {
//     arrProductos = [];
//     localStorage.setItem('productsList', JSON.stringify(arrProductos));
// }

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
    let product = arrProductos.find(prod => prod.product_id == idProd);
    const newImage = document.getElementById('imagen-de-producto');
    newImage.src = product.image_url;
}

function confirmDelete (idProd) {
    currentProductId = idProd;
    const texto = document.getElementById('txt-confirm-delete');
    texto.textContent = `¿ Deseas elimiar el producto ${idProd.toString().padStart(4, "0")} ?`;
}

function crearFila(prod) {
    let tabla = document.getElementById('body-tabla');
    let newRow = document.createElement('tr');
    newRow.id = prod.product_id;

    newRow.innerHTML = `
        <td>${prod.product_id.toString().padStart(4, "0")}</td>
        <td class="text-center">
            <img class="miniatura-img" data-bs-toggle="modal" data-bs-target="#modalImg" onclick="setImagen('${prod.product_id}')" src="${prod.image_url}" class="img-thumbnail" alt="modelo imagen">
        </td>
        <td>${prod.model}</td>
        <td><b>${prod.is_adult_size ? 'Tallas de adulto:' : 'Tallas de niño:'}</b><br>${prod.size_list.join(", ")}</td>
        <td><b>Sexo:</b> ${prod.genre}<br><b>Tipo de manga:</b> ${prod.sleeve_type}<br><b>Color:</b> ${prod.color}</td>
        <td>$ ${prod.price} MXN</td>
        <td>
            <span data-bs-toggle="modal" data-bs-target="#modalEdit">
                <i onclick="setInfoProduct('${prod.product_id}')" class="bi bi-pencil-square icon-edit" data-bs-custom-class="custom-tooltip-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar Producto"></i>
            </span>
            <span data-bs-toggle="modal" data-bs-target="#modalDelete">
                <i onclick="confirmDelete('${prod.product_id}')" class="bi bi-trash3-fill icon-delete" data-bs-custom-class="custom-tooltip-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar Producto"></i>
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
        //validamos que la imagen tenga una extension png, jpg, jpeg o webp
        if(["png", "jpg", "jpeg", "webp"].includes(extensionImg)) {
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
    // let producto = {
    //     modelo: modelo.value,
    //     imagen_url: "",
    //     tipo_manga: manga.value,
    //     sexo: sexo.value,
    //     talla_adulto: tallaAdulto.checked,
    //     tallas: tallaAdulto.checked ? arrTallasAdulto: arrTallasNino,
    //     color: color.value,
    //     precio: parseFloat(precio.value)
    // }

    let productoDB = {
        model: modelo.value,
        image_url: "",
        sleeve_type: manga.value,
        genre: sexo.value,
        is_adult_size: tallaAdulto.checked,
        size_list: tallaAdulto.checked ? arrTallasAdulto: arrTallasNino,
        color: color.value,
        price: parseFloat(precio.value).toFixed(2)
    }

    productoDB.size_list = JSON.stringify(productoDB.size_list);
    
    try {
        //Se convierte el archivo de la imagen a una cadena de texto
        const imgData = await getBase64(img);
        //Se almacena la informacion de la imagen en producto
        //producto.imagen_url = imgData;
        productoDB.image_url = imgData;
        
        //Se almacena producto en localStorage
        //arrProductos.push(producto);
        //localStorage.setItem('productsList', JSON.stringify(arrProductos));
        crearProductDB(productoDB);

    } catch (error) {
        return console.log(error)
    }
    

}

//Eliminación de producto
document.getElementById('delete-product').addEventListener('click', () => {
    eliminarProductDB(currentProductId);
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
            const modeloTxt = prod.model.toLowerCase();
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
    let producto = arrProductos.find(prod => prod.product_id == idProd);
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
    modeloEdit.value = producto.model;
    mangaEdit.value = producto.sleeve_type;
    sexoEdit.value = producto.genre;
    tallaAdultoEdit.checked = producto.is_adult_size;
    colorEdit.value = producto.color;
    precioEdit.value = producto.price;

    let tipoTalla = "";
    
    //Estableciendo el tipo de talla seleccionado
    if (tallaAdultoEdit.checked) {
        tallaNinoEdit.checked = false;
        arrTallasAdulto = producto.size_list;
        tipoTalla = 'adulto';
        
    } else {
        tallaNinoEdit.checked = true;
        arrTallasNino = producto.size_list;
        tipoTalla = 'nino';
    }

    //Mostrando las tallas en cuestión
    mostrarTallas(tipoTalla);

    //Haciendo check en los inputs de las tallas correspondientes
    producto.size_list.forEach(talla => {
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
            //validamos que la imagen tenga una extension png, jpg, jpeg o webp
            if(["png", "jpg", "jpeg", "webp"].includes(extensionImg)) {
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
    // arrProductos.forEach(prod => {
    //     if (prod.product_id == currentProductId) {
    //         prod.model = modeloEdit.value;
    //         prod.sleeve_type = mangaEdit.value;
    //         prod.genre = sexoEdit.value;
    //         prod.is_adult_size = tallaAdultoEdit.checked;
    //         prod.size_list = tallaAdultoEdit.checked ? arrTallasAdulto: arrTallasNino;
    //         prod.color = colorEdit.value;
    //         prod.price = parseFloat(precioEdit.value).toFixed(2);
    //     }
    // });

    let currentProd = arrProductos.find(prod => prod.product_id == currentProductId);
    
    const editJson = {
        model: modeloEdit.value,
        sleeve_type: mangaEdit.value,
        genre: sexoEdit.value,
        is_adult_size: tallaAdultoEdit.checked,
        size_list: tallaAdultoEdit.checked ? arrTallasAdulto: arrTallasNino,
        color: colorEdit.value,
        price: parseFloat(precioEdit.value).toFixed(2),
    }

    editJson.size_list = JSON.stringify(editJson.size_list);

    if (cambiarImagen.checked) {
        try {
            //Se convierte el archivo de la imagen a una cadena de texto
            const imgData = await getBase64(img);
            //Editamos la imagen del producto en cuestión
            editJson.image_url = imgData;
            editarProductDB(currentProductId, editJson);

        } catch (error) {
            return console.log(error)
        }
    
    } else {
        editJson.image_url = currentProd.image_url;
        editarProductDB(currentProductId, editJson);
    }

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



async function crearProductDB(jsonx) {
    const rawResponse = await fetch("http://localhost:8080/shuncos/products", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonx)
    });
    const prod = await rawResponse.json();
    
    prod.size_list = JSON.parse(prod.size_list);

    crearFila(prod)
    cerrarModal('modalCreate');
    alerta("verde", "Producto agregado correctamente");
}


async function obtenerProductsDB() {
    const rawResponse = await fetch("http://localhost:8080/shuncos/products/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    arrProductos = await rawResponse.json();
    arrProductos.forEach(prod => {
        prod.size_list = JSON.parse(prod.size_list);
    });
    document.getElementById("buscar-btn").click();
}


async function editarProductDB(idx, jsonx) {
    const rawResponse = await fetch(`http://localhost:8080/shuncos/products/${idx}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonx)
    });

    let prod = await rawResponse.json();
    console.log(prod);
    //Se almacena actualizacion en localStorage
    //localStorage.setItem('productsList', JSON.stringify(arrProductos));
    
    cerrarModal('modalEdit');
    alerta("azul", "Producto editado correctamente");
    obtenerProductsDB();
}


async function eliminarProductDB(idx) {
    const rawResponse = await fetch(`http://localhost:8080/shuncos/products/${idx}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    //const response = await rawResponse.json();
    //console.log(response);

    localStorage.setItem('productsList', JSON.stringify(arrProductos));
    let productRow = document.getElementById(currentProductId);
    productRow.remove();
    cerrarModal('modalDelete');
    alerta("rosa", "Producto eliminado correctamente");
    obtenerProductsDB();

}