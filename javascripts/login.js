let formRegister = document.getElementById("form-register-user");
let formLogin = document.getElementById("form-login-user");

function inputInvalid(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

function inputValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function changeView(vista) {
    let loginView = document.getElementById("login-user"); 
    let registerView = document.getElementById("register-user");

    if (vista == "login") {
        registerView.classList.add("hidden");
        loginView.classList.remove("hidden");
    }

    if (vista == "registro") {
        loginView.classList.add("hidden");
        registerView.classList.remove("hidden");
    }
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

formRegister.onsubmit = function(e) {
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
        if(usr.username == newUsername.value) {
            usernameInUse = true;
            return;
        }
        if(usr.email == email.value) {
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

    //Se asigna un id random al usuario
    const ID = (Math.random() + 1).toString(36).substring(5);

    const newUser = {
        name: name.value,
        lastName: lastName.value,
        username: newUsername.value,
        email: email.value,
        password: newPassword.value,
        isAdmin: false
    };

    usersList.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(usersList));

    alerta("verde", "Registro exitoso. ¡Bienvenido!");
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);

}


formLogin.onsubmit = function(e) {
    event.preventDefault();
    let username = document.getElementById('usernameLogin');
    let password = document.getElementById('passwordLogin');

    //Validando el username
    if (username.value == "") {
        inputInvalid(username);
        return alerta("rosa", "Ingresa el username.");
    } else {
        username.classList.remove('is-invalid');
    }

    //Validando el password
    if (password.value == "") {
        inputInvalid(password);
        return alerta("rosa", "Ingresa el password.");
    } else {
        password.classList.remove('is-invalid');
    }

    let usersList = localStorage.getItem('registeredUsers');
    usersList = usersList ? JSON.parse(usersList) : [];

    let userFind = usersList.find(usr => {
        return (usr.username == username.value && usr.password == password.value);
    })

    if (userFind) {
        alerta("verde", "Inicio de sesión exitoso. ¡Bienvenido!");
        localStorage.setItem('currentUser', JSON.stringify(userFind));
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);

    } else {
        return alerta("rosa", "Credenciales incorrectas. Inténtalo de nuevo.");
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