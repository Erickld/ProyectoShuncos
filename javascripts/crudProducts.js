let arrProductos = []
let arrTallasNino = [];
let arrTallasAdulto = [];

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

    if (tipo == 'adulto') {
        arrTallasAdulto = array;
    } else {
        arrTallasNino = array;
    }
}


document.getElementById('add-new-product').addEventListener('click', () => {

    let modelo = document.getElementById('name-modelo');
    let imagen = document.getElementById('img-prod');
    let manga = document.getElementById("tipo-manga");
    let sexo = document.getElementById("sexo");
    let tallaAdulto = document.getElementById("talla-adulto");
    let color = document.getElementById("color");
    let precio = document.getElementById("precio");

    
    //validar valores (alertas), input file -> (solo imagenes)

    if (modelo.value == "") {
        modelo.classList.remove('is-valid');
        return modelo.classList.add('is-invalid');
    } else {
        modelo.classList.remove('is-invalid');
        modelo.classList.add('is-valid');
    }
    
    let producto = {
        modelo: modelo.value,
        imagen_url: "",
        tipo_manga: manga.value,
        sexo: sexo.value,
        talla_adulto: tallaAdulto.checked,
        tallas: tallaAdulto.checked ? arrTallasAdulto: arrTallasNino,
        color: color.value,
        precio: parseFloat(precio.value)
    }

    imax = imagen.files[0];

    if (imax) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                    producto.imagen_url = reader.result;
                    arrProductos.push(producto)
                    //localStorage.setItem('arrProductos', arrProductos);
                    //const newImage = document.getElementById('img-from-local-storage',);
                    //newImage.src = localStorage.getItem('imax');
            
            });
            reader.readAsDataURL(imax);
    } else {
        arrProductos.push(producto)
    }

    //indice del ultimo elemento agregado
    let index = arrProductos.length - 1;

    //crear nuevo row en tabla
    let tabla = document.getElementById('body-tabla');
    let newRow = document.createElement('tr');
    newRow.id = "tr-"+index;

    newRow.innerHTML =    `
        <th scope="row">${index + 1}</th>
        <td>
            <i index="${index}" class="bi bi-image icon-table-1" data-bs-custom-class="custom-tooltip-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Mostrar imagen"></i>
        </td>
        <td>${producto.modelo}</td>
        <td><b>${producto.talla_adulto ? 'Tallas de adulto:' : 'Tallas de niño:'}</b><br>${producto.tallas.join(", ")}</td>
        <td><b>Sexo:</b> ${producto.sexo}<br><b>Tipo de manga:</b> ${producto.tipo_manga}<br><b>Color:</b> ${producto.color}</td>
        <td>$ ${producto.precio} MXN</td>
        <td>
            <i index="${index}" class="bi bi-pencil-square icon-table-2" data-bs-custom-class="custom-tooltip-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar producto"></i>
            <i index="${index}" class="bi bi-trash3-fill icon-table-3" data-bs-custom-class="custom-tooltip-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar producto"></i>
        </td>
    `
    tabla.appendChild(newRow);
    updateTooltips();

    const myModal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    myModal.hide();

    //resetear inputs del modal


});