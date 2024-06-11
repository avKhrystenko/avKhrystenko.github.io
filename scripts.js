let currentIndex = 0;
const posters = document.querySelectorAll('.poster');
const totalPosters = posters.length;
const postersInView = 4;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.style.transform = `translateX(-${currentIndex * 23}vw)`;

    // Update visibility of navigation buttons
    if (currentIndex === 0) {
        prevBtn.classList.remove('visible');
    } else {
        prevBtn.classList.add('visible');
    }

    if (currentIndex >= totalPosters - postersInView) {
        nextBtn.classList.remove('visible');
    } else {
        nextBtn.classList.add('visible');
    }
}

document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && currentIndex < totalPosters - postersInView) {
        currentIndex++;
    } else if (event.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
    }
    updateCarousel();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && currentIndex < totalPosters - postersInView) {
        currentIndex++;
    } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalPosters - postersInView) {
        currentIndex++;
        updateCarousel();
    }
});

updateCarousel();
