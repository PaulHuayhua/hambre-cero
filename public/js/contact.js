document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(this);

    fetch('https://script.google.com/macros/s/AKfycbyZ3JKE1rFYmUSpoQ2seW6aqX0DUgAiIvkh6S89Ou44JDiprjxHoRUGd2qNixQvSy3l/exec', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'  // Desactiva CORS
    })
        .then(response => {
            alert('Tu mensaje ha sido enviado.');
            // Limpiar el formulario después de enviar el mensaje
            document.getElementById("contact-form").reset();
        })
        .catch(error => {
            alert('Ocurrió un error. Intenta nuevamente.');
        });
});
