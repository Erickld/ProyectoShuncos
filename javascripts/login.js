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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;;
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
    
    const jsonx = {
        first_name: name.value,
        last_name: lastName.value,
        username: newUsername.value,
        email: email.value,
        password: newPassword.value
    }
    
    crearUserDB(jsonx, newUsername, email);

}



formLogin.onsubmit = function(e) {
    e.preventDefault();
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

    const jsonx = {
        username: username.value,
        password: password.value
    }

    loginUserDB(jsonx);
    
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


async function crearUserDB(jsonx, newUsername, email) {

    const rawResponse = await fetch("http://localhost:8080/shuncos/user/", {
      method: 'POST',
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

    const newUser = {
        id: response.user.user_id,
        name: response.user.first_name,
        lastName: response.user.last_name,
        username: response.user.username,
        email: response.user.email,
        password: response.user.password,
        isAdmin: response.user.is_admin
    };
    
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alerta("verde", "Registro exitoso. ¡Bienvenido!");
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);    
}



async function obtenerUserDB() {
    const rawResponse = await fetch("http://localhost:8080/shuncos/user/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
}


async function loginUserDB(jsonx) {

    const rawResponse = await fetch("http://localhost:8080/shuncos/user/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonx)
    });

    const response = await rawResponse.json();

    if (response.userFinded) {
        const loginUser = {
            id: response.user.user_id,
            name: response.user.first_name,
            lastName: response.user.last_name,
            username: response.user.username,
            email: response.user.email,
            password: response.user.password,
            isAdmin: response.user.is_admin
        };
        localStorage.setItem('currentUser', JSON.stringify(loginUser));
        alerta("verde", "Inicio de sesión exitoso. ¡Bienvenido!");
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);
    } else {
        return alerta("rosa", "Credenciales incorrectas. Inténtalo de nuevo.");
    }

}