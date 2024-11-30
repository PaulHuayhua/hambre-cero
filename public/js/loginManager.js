// Función para alternar formularios (mostrar login o registro) 
function toggleForm(formToShow) {
    document.getElementById('login-form').style.display = formToShow === 'login' ? 'block' : 'none';
    document.getElementById('register-form').style.display = formToShow === 'register' ? 'block' : 'none';
}

// Manejador de eventos para el formulario de inicio de sesión (sin comunicación con el servidor)
document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;

    console.log('Intento de inicio de sesión:', { email, password });
});

// Manejador de eventos para el formulario de registro (sin comunicación con el servidor)
document.getElementById('register').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;
    const confirmPassword = this['confirm-password'].value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    console.log('Intento de registro:', { username, email, password });
});

// Manejador de eventos para el formulario de inicio de sesión con comunicación al servidor
document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;

    fetch('http://54.163.138.15:3001/api/users/login', {  // Cambié la URL aquí
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data === 'Inicio de sesión exitoso') {
                window.location.href = '../index.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Manejador de eventos para el formulario de registro con comunicación al servidor
document.getElementById('register').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;
    const confirmPassword = this['confirm-password'].value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    fetch('http://54.163.138.15:3001/api/users/register', {  // Cambié la URL aquí
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data === 'Usuario registrado con éxito') {
                window.location.href = '../index.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
