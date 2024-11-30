document.addEventListener("DOMContentLoaded", function() {
    var items = document.querySelectorAll('.item a');
    var modal = document.getElementById("myModal");
    var img = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var downloadLink = document.getElementById("downloadLink");

    items.forEach(item => {
        item.onclick = function(event) {
            event.preventDefault();
            var imgSrc = this.getAttribute('href');
            img.src = imgSrc;
            captionText.innerHTML = this.getAttribute('title') || '';
            downloadLink.href = imgSrc;
            downloadLink.download = imgSrc.split('/').pop();
            modal.style.display = "flex";
        }
    });

    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
    };
});
