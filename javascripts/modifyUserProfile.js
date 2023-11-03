let currentUserx = localStorage.getItem('currentUser');
currentUserx = JSON.parse(currentUserx);
formChangeUser = document.getElementById("form-change-user");

if (currentUserx) {
    updateInfoUser();
    if (currentUserx.isAdmin) {
        //Mostrar una tabla y ocultar otra
    } else {
        //Mostrar una tabla y ocultar otra
    }

} else {
    window.location.href = "../login.html";
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

    let usersList = localStorage.getItem('registeredUsers');
    usersList = usersList ? JSON.parse(usersList) : [];

    //Validamos si el correo y username del nuevo usuario ya se encuentra registrado por otro usuario
    let emailInUse = false;
    let usernameInUse = false;
    usersList.forEach(usr => {
        if(usr.username == newUsername.value && usr.id !== currentUserx.id) {
            usernameInUse = true;
            return;
        }
        if(usr.email == email.value && usr.id !== currentUserx.id) {
            emailInUse = true;
            return;
        }
    });
    
    if(usernameInUse) {
        inputInvalid(newUsername);
        return alerta("rosa", `El username "${newUsername.value}" ya se encuentra registrado por otro usuario.`);
    }
    
    if(emailInUse) {
        inputInvalid(email);
        return alerta("rosa", `El correo "${email.value}" ya se encuentra registrado por otro usuario.`);
    }

    currentUserx.name = name.value;
    currentUserx.lastName = lastName.value;
    currentUserx.username = newUsername.value;
    currentUserx.email = email.value;
    currentUserx.password = newPassword.value;

    usersList = usersList.filter(usr => usr.id !== currentUserx.id);
    usersList.push(currentUserx);

    localStorage.setItem('registeredUsers', JSON.stringify(usersList));
    localStorage.setItem('currentUser', JSON.stringify(currentUserx));

    updateInfoUser();
    //Cerrar el modal
    cerrarModal("modalEdit");
    alerta("verde", "La información de la cuenta se ha actualizado exitosamente.");

}

document.getElementById("delete-account").addEventListener("click", () => {
    //Eliminar pedidos del usuario en cuestion (pendiente)

    //Se obtiene la lista de usuarios registrados
    let usersList = localStorage.getItem('registeredUsers');
    usersList = usersList ? JSON.parse(usersList) : [];

    //Se elimina de la lista al usuario en cuestion
    usersList = usersList.filter(usr => usr.id !== currentUserx.id);

    //Se almacena el resgitro de usuarios actualizado
    localStorage.setItem('registeredUsers', JSON.stringify(usersList));
    localStorage.removeItem("currentUser");

    cerrarModal("modalDelete");
    alerta("verde", "Su cuenta ha sido eliminada correctamente.");

    setTimeout(() => {
        window.location.href = "../login.html";
    }, 2000);

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