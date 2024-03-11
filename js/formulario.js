function registrarUsuario() {
    const formulario = document.getElementById('register');
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('usrR');
        nombre = document.getElementById('nombreR'),
            apellido = document.getElementById('apellidoR'),
            email = document.getElementById('emailR'),
            contraseña = document.getElementById('passR1'),
            repetirContraseña = document.getElementById('passR2');
        console.log(contraseña.value);
        console.log(repetirContraseña.value);
        if (nombre.value == '' || apellido.value == '' || email.value == '' || contraseña.value == '' || repetirContraseña.value == '') {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        if (contraseña.value !== repetirContraseña.value) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        datosUsuario = { user: (user.value), nombre: (nombre.value), apellido: (apellido.value), email: (email.value), contraseña: (contraseña.value) };
        sessionStorage.setItem('nuevoRegistro', JSON.stringify(datosUsuario));
        alert('¡Registro exitoso!');
        window.location.href='./pages/principal.html';
    });
}
registrarUsuario();