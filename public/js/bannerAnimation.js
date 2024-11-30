document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.banner');
    const bannerContent = banner.innerHTML;

    banner.innerHTML = bannerContent + bannerContent + bannerContent;

    function adjuntAnimation() {
        const bannerWidth = banner.scrollWidth;
        const duration = bannerWidth / 50;
        banner.style.animationDuration = `${duration}s`
    }

    adjuntAnimation();
    window.addEventListener('resize', adjuntAnimation);
})