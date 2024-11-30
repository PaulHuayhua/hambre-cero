var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
        depth: 500,
        modifier: 1,
        slidesShadow: true,
        rotate: 0,
        stretch: 0,
    },
    autoplay: {
        delay: 5000, 
        disableOnInteraction: false,
    },
});
