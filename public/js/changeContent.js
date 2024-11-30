function cambiarContenido(region) {
    const contenido = document.getElementById('content');

    fetch('../json/regions.json')
        .then(response => response.json())
        .then(data => {
            const regionData = data[region];

            if (regionData) {
                contenido.innerHTML = `
                    <h2>${regionData.titulo}</h2>
                    <p><strong>Desafíos principales:</strong></p>
                    <ul>
                        ${regionData.desafios.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                    <p><strong>Acciones necesarias:</strong></p>
                    <ul>
                        ${regionData.acciones.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                `;
            } else {
                contenido.innerHTML = `<p>Información no disponible para la región seleccionada.</p>`;
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos del JSON:', error);
            contenido.innerHTML = '<p>No se pudo cargar la información.</p>';
        });
}
