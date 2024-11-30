document.querySelectorAll('.ods').forEach( ods => {
    ods.addEventListener('mouseover', () => {
        ods.querySelector('img').style.transform = 'rotateY(180deg)';
        ods.querySelector('.text').style.transform = 'rotateY(0)';
    })
    ods.addEventListener('mouseout', () => {
        ods.querySelector('img').style.transform = 'rotateY(0)';
        ods.querySelector('.text').style.transform = 'rotateY(180deg)';
    })
})