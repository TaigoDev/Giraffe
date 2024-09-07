const buttons = document.querySelectorAll('.acc-btn');
const faqBlocks = document.querySelectorAll('.faqOne, .faqTwo, .faqThree, .faqFour');
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        faqBlocks.forEach(block => block.style.display = 'none');

        faqBlocks[index].style.display = 'block';
    });
});

// btns.forEach((el) => el.addEventListener("click", accordion));

document.addEventListener('DOMContentLoaded', function () {

    const slider1Slides = document.querySelectorAll('.slider-slide'); 
    let slider1Index = 0;

    document.querySelectorAll('.slider-buttons .slider-button').forEach((button) => {
        button.addEventListener('click', function () {
            slider1Index = (button.id === 'left') ? 
                (slider1Index > 0 ? slider1Index - 1 : slider1Slides.length - 1) : 
                (slider1Index < slider1Slides.length - 1 ? slider1Index + 1 : 0);
            updateSlider(slider1Slides, slider1Index);
        });
    });

    function updateSlider(slides, index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    updateSlider(slider1Slides, slider1Index);

    const cadImgContainer = document.querySelector('.slder-cad .cad-img');
    const cadButtons = document.querySelectorAll('.slder-cad .buttons-slider img'); 

    cadButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const scrollAmount = cadImgContainer.clientWidth; 
            cadImgContainer.scrollLeft += (button.id === 'left') ? -scrollAmount : scrollAmount;
        });
    });

    const cadSmallImgContainer = document.querySelector('.slder-cad-small .cad-img-small'); 
    const cadSmallButtons = document.querySelectorAll('.slder-cad-small .buttons-slider img'); 

    cadSmallButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const scrollAmount = cadSmallImgContainer.clientWidth; 
            cadSmallImgContainer.scrollLeft += (button.id === 'left') ? -scrollAmount : scrollAmount;
        });
    });

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const images = document.querySelectorAll('.cad-img img, .cad-img-small img, .slider-slide img'); 
    const closeModal = document.querySelector('.close');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let modalIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalIndex = index;
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prev.addEventListener('click', () => {
        modalIndex = (modalIndex > 0) ? modalIndex - 1 : images.length - 1;
        modalImg.src = images[modalIndex].src;
    });

    next.addEventListener('click', () => {
        modalIndex = (modalIndex < images.length - 1) ? modalIndex + 1 : 0;
        modalImg.src = images[modalIndex].src;
    });


    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

































document.addEventListener('DOMContentLoaded', function () {
    // Инициализация слайдера
    const sliderSlides = document.querySelectorAll('.slider-slide');
    const paginationContainer = document.querySelector('.pagination');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    let currentIndex = 0; // Текущий индекс слайда

    function updateSlider() {
        sliderSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        updatePagination();
        updateArrows();
    }

    function updateArrows() {
        leftButton.classList.toggle('disabled', currentIndex === 0);
        rightButton.classList.toggle('disabled', currentIndex === sliderSlides.length - 1);
    }

    function createPagination() {
        paginationContainer.innerHTML = '';
        sliderSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
            paginationContainer.appendChild(dot);
        });
        updatePagination();
    }

    function updatePagination() {
        const dots = paginationContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    leftButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    rightButton.addEventListener('click', () => {
        if (currentIndex < sliderSlides.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    // Инициализация
    createPagination();
    updateSlider();
});