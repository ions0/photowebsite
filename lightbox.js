let currentImageIndex = 0;
let images = [];

// Automatically populate images array from gallery items on page load
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    images = Array.from(galleryItems).map(item => {
        return item.getAttribute('onclick').match(/'([^']+)'/)[1];
    });
});

function openLightbox(imgSrc) {
    currentImageIndex = images.indexOf(imgSrc);
    document.getElementById('lightbox').style.display = 'flex';
    document.getElementById('lightbox-img').src = imgSrc;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    document.getElementById('lightbox-img').src = images[currentImageIndex];
}

// Close lightbox on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    if (e.key === 'ArrowRight') changeLightboxImage(1);
});

// Close lightbox when clicking outside image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});