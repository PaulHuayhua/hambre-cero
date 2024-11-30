let currentSlide = 0;
const slides = document.querySelectorAll('.carousel .slide');
let interval;

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    document.querySelector('.carousel-slides').style.transform = `translateX(${offset}%)`
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startCarousel() {
    interval = setInterval(nextSlide, 5000)
}

function stopCarousel() {
    clearInterval(interval);
}

const carousel = document.querySelector('.carousel');

carousel.addEventListener('mouseover', stopCarousel);
carousel.addEventListener('mouseout', startCarousel);

startCarousel();