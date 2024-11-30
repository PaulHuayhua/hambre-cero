const scrollBtn = document.getElementById('scroll-btn');

window.addEventListener('scroll', () => {
    scrollFunction();
});

function scrollFunction() {
    if (window.scrollY > 200) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
}

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
