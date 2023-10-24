function validarCorreoElectronico(correo) {
    const expresionRegularCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return expresionRegularCorreo.test(correo);
  }

  function validarContraseña(contraseña) {
    const expresionRegularContraseña = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return expresionRegularContraseña.test(contraseña);
  }
  function validarNombreApellido(nombre) {
    const expresionRegularNombre = /^[A-Za-z]{2,}$/;
    return expresionRegularNombre.test(nombre);
  }
  function validarNombreUsuario(usuario) {
    const expresionRegularUsuario = /^[A-Za-z0-9]{4,}$/;
    return expresionRegularUsuario.test(usuario);
  }

  
  const formulario = document.getElementById('miFormulario');
  formulario.addEventListener('submit', function(event) {
    if (!validarCorreoElectronico(formulario.correo.value)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      event.preventDefault(); // Evita que el formulario se envíe
      return;
    }

    if (!validarContraseña(formulario.contrasena.value)) {
      alert('La contraseña no cumple con los requisitos mínimos.');
      event.preventDefault();
      return;
    }

    if (!validarNombreApellido(formulario.nombre.value)) {
      alert('El nombre no es válido.');
      event.preventDefault();
      return;
    }

    if (!validarNombreApellido(formulario.apellido.value)) {
      alert('El apellido no es válido.');
      event.preventDefault();
      return;
    }

    if (!validarNombreUsuario(formulario.usuario.value)) {
      alert('El nombre de usuario no es válido.');
      event.preventDefault();
      return;
    }

    // Si todos los campos son válidos, el formulario se enviará normalmente.
  });
