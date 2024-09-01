// Получаем все кнопки и блоки FAQ
const buttons = document.querySelectorAll('.acc-btn');
const faqBlocks = document.querySelectorAll('.faqOne, .faqTwo, .faqThree, .faqFour');

// Добавляем обработчики событий для каждой кнопки
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Скрываем все FAQ блоки
        faqBlocks.forEach(block => block.style.display = 'none');

        // Показываем соответствующий блок по индексу кнопки
        faqBlocks[index].style.display = 'block';
    });
});

btns.forEach((el) => el.addEventListener("click", accordion));

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
