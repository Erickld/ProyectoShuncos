let currentUserx = localStorage.getItem('currentUser');
currentUserx = JSON.parse(currentUserx);
formChangeUser = document.getElementById("form-change-user");

if (currentUserx) {
    updateInfoUser();
    if (currentUserx.isAdmin) {
        //Ocultar tabla
        let elements = document.querySelectorAll(".tabla-pedidos-user");
        elements.forEach(elm => elm.style.display = "none");
    } else {
        //Mostrar y crear una tabla
        let elements = document.querySelectorAll(".tabla-pedidos-user");
        elements.forEach(elm => elm.style.display = "initial");
        getOrdersbyUser();
    }

} else {
    //window.location.href = "../login.html";
    window.location.href = "https://erickld.github.io/ProyectoShuncos/login.html";
}

document.getElementById("prepare-edit").addEventListener("click", () => {
    //obteniendo inputs del formulario
    let name = document.getElementById('name');
    let lastName = document.getElementById('lastName');
    let newUsername = document.getElementById('newUsername');
    let email = document.getElementById('email');
    let newPassword = document.getElementById('newPassword');

    //Se limpian validaciones de los input
    name.classList.remove('is-valid', 'is-invalid');
    lastName.classList.remove('is-valid', 'is-invalid');
    newUsername.classList.remove('is-valid', 'is-invalid');
    email.classList.remove('is-valid', 'is-invalid');
    newPassword.classList.remove('is-valid', 'is-invalid');

    //Se asignan los valores del usuario a los inputs correspondientes
    name.value = currentUserx.name;
    lastName.value = currentUserx.lastName;
    newUsername.value = currentUserx.username;
    email.value = currentUserx.email;
    newPassword.value = currentUserx.password;
})


formChangeUser.onsubmit = function(e) {
    e.preventDefault();

    //obteniendo inputs del formulario
    let name = document.getElementById('name');
    let lastName = document.getElementById('lastName');
    let newUsername = document.getElementById('newUsername');
    let email = document.getElementById('email');
    let newPassword = document.getElementById('newPassword');

    //Validando nombre del usuario
    if (name.value == "") {
        inputInvalid(name);
        return alerta("rosa", "Ingresa el nombre del usuario.");
    } else {
        inputValid(name);
    }

    //Validando apellido del usuario
    if (lastName.value == "") {
        inputInvalid(lastName);
        return alerta("rosa", "Ingresa el apellido del usuario.");
    } else {
        inputValid(lastName);
    }

    //Validando el username
    if (newUsername.value == "") {
        inputInvalid(newUsername);
        return alerta("rosa", "Ingresa el username.");
    } else {
        inputValid(newUsername);
    }

    //Validando el correo del usuario
    if (!isEmailValid(email.value)) {
        inputInvalid(email);
        return alerta("rosa", "Por favor, ingresa una dirección de correo electrónico válida.");
    } else {
        inputValid(email);
    }

    //Validando el password del usuario
    if (!isPasswordStrong(newPassword.value)) {
        inputInvalid(newPassword);
        return alerta("rosa", "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y tener al menos 8 caracteres.");
    } else {
        inputValid(newPassword);
    }

    const jsonx = {
        first_name: name.value,
        last_name: lastName.value,
        username: newUsername.value,
        email: email.value,
        password: newPassword.value
    }

    editUserDB(jsonx, newUsername, email);
}

document.getElementById("delete-account").addEventListener("click", () => {
    //Eliminar pedidos del usuario en cuestion (pendiente)
    eliminarUserDB();
})


function cerrarModal(modalId) {
    const myModal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    myModal.hide();
}

function inputInvalid(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

function inputValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function isEmailValid(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}

function isPasswordStrong(password) {
    // La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y tener una longitud mínima de 8 caracteres.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

function updateInfoUser() {
    let namex = document.getElementById("namex");
    let lastNamex = document.getElementById("last-namex");
    let usernamex = document.getElementById("usernamex");
    let emailx = document.getElementById("emailx");
    let passwordx = document.getElementById("passwordx");

    namex.textContent = currentUserx.name;
    lastNamex.textContent = currentUserx.lastName;
    usernamex.textContent = currentUserx.username;
    emailx.textContent = currentUserx.email;
    // passwordx.textContent = currentUserx.password;
    passwordx.textContent = "";
    currentUserx.password.split("").forEach(element => {
        passwordx.textContent += "*";
    });
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


function statusTxt(valor) {
    if (valor == 0) {
        return "Pendiente";
    } else if (valor == 1) {
        return "Enviado";
    } else if (valor == 2) {
        return "Entregado";
    } else {
        return "Not found";
    }
}


function crearNewFila(ord) {    
    let tabla = document.getElementById('body-tabla');
    let newRow = document.createElement('tr');
    newRow.id = ord.ord_id;

    newRow.innerHTML = `
        <td>${ord.order_id.toString().padStart(4, "0")}</td>
        <td>
            ${ord.create_at}
        </td>
        <td>
            ${statusTxt(ord.status)}
        </td>
        <td>
            ${ord.address.state}, ${ord.address.city}
        </td>
        <td>
            TDC
        </td>
        <td>
            $ ${ord.subtotal_price.toFixed(2)} MXN
        </td>
        <td>
            $ ${ord.shipment_price.toFixed(2)} MXN
        </td>
        <td>
            $ ${ord.total_price.toFixed(2)} MXN
        </td>
    `
    tabla.appendChild(newRow);
}



async function editUserDB(jsonx, newUsername, email) {

    const rawResponse = await fetch(`http://localhost:8080/shuncos/user/${currentUserx.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonx)
    });

    const response = await rawResponse.json();

    //Validamos si el correo y username del nuevo usuario ya se encuentra registrado por otro usuario
    if(response.usernameInUse) {
        inputInvalid(newUsername);
        return alerta("rosa", `El username "${newUsername.value}" ya se encuentra registrado por otro usuario.`);
    }
    
    if(response.emailInUse) {
        inputInvalid(email);
        return alerta("rosa", `El correo "${email.value}" ya se encuentra registrado por otro usuario.`);
    }

    currentUserx.name = response.user.first_name;
    currentUserx.lastName = response.user.last_name;
    currentUserx.username = response.user.username;
    currentUserx.email = response.user.email;
    currentUserx.password = response.user.password;

    localStorage.setItem('currentUser', JSON.stringify(currentUserx));

    updateInfoUser();
    //Cerrar el modal
    cerrarModal("modalEdit");
    alerta("verde", "La información de la cuenta se ha actualizado exitosamente.");
 
}


async function eliminarUserDB() {

    const rawResponse = await fetch(`http://localhost:8080/shuncos/user/${currentUserx.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    //const response = await rawResponse.json();
    localStorage.removeItem("currentUser");
    cerrarModal("modalDelete");
    alerta("verde", "Su cuenta ha sido eliminada correctamente.");

    setTimeout(() => {
        //window.location.href = "../login.html";
        window.location.href = "https://erickld.github.io/ProyectoShuncos/login.html";
    }, 2000);

}


async function getOrdersbyUser() {

    const rawResponse = await fetch(`http://localhost:8080/shuncos/orders/user/${currentUserx.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const arrOrder = await rawResponse.json();
    let tabla = document.getElementById('body-tabla');
    tabla.innerHTML = "";
    arrOrder.forEach(ord => {
        crearNewFila(ord);
    });

}





