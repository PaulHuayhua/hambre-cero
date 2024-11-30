document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('donationForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const progressBar = document.getElementById('progress');
    const raisedAmount = document.getElementById('raised');
    const goal = 10000;
    let totalRaised = 0;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const amount = parseFloat(document.getElementById('amount').value);
        const name = document.getElementById('name').value;

        // Simular el envío de datos a un servidor
        console.log(`Donación recibida: €${amount} de ${name}`);

        // Actualizar la cantidad recaudada y la barra de progreso
        totalRaised += amount;
        raisedAmount.textContent = totalRaised.toFixed(2);
        const progress = (totalRaised / goal) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;

        // Ocultar el formulario y mostrar el mensaje de agradecimiento
        form.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
        setTimeout(() => {
            thankYouMessage.classList.add('visible');
        }, 50);

        // Simular una nueva donación después de 5 segundos
        setTimeout(() => {
            thankYouMessage.classList.remove('visible');
            setTimeout(() => {
                form.classList.remove('hidden');
                thankYouMessage.classList.add('hidden');
                form.reset();
            }, 500);
        }, 5000);
    });
});