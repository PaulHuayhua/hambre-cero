function changePhrase() {
    const phraseElement = document.getElementById("phrase");
    phraseElement.style.opacity = "0";
    phraseElement.style.transform = "translateY(20px)";

    setTimeout(() => {
        fetch('../json/phrases.json')
            .then(response => response.json())
            .then(data => {
                const phrases = data.phrases;
                const randomIndex = Math.floor(Math.random() * phrases.length);
                phraseElement.textContent = phrases[randomIndex];
                phraseElement.style.opacity = "1";
                phraseElement.style.transform = "translateY(0)";
                phraseElement.style.animation = "slideInFade 0.5s ease-out forwards";
            });
    }, 500);
}

setInterval(changePhrase, 5000);
