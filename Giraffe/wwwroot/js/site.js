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
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider1');
    const cadSmallImgContainer = slider.querySelector('.cad-img-small');
    const images = cadSmallImgContainer.querySelectorAll('img');
    const leftButton = slider.querySelector('#left');
    const rightButton = slider.querySelector('#right');
    const paginationContainer = slider.querySelector('.pagination');

    let currentIndex = 0;
    let imagesPerSlide = 2;
    const totalImages = images.length;
    let totalPages = Math.ceil(totalImages / imagesPerSlide);

    // Обновление количества изображений на слайде в зависимости от размера окна
    function updateImagesPerSlide() {
        imagesPerSlide = window.innerWidth <= 768 ? 1 : 2;
        totalPages = Math.ceil(totalImages / imagesPerSlide);
        updateSlider();
        createPagination();
    }

    // Обновление слайдера при изменении текущего индекса
    function updateSlider() {
        const scrollAmount = currentIndex * (images[0].offsetWidth + 14);
        cadSmallImgContainer.style.transform = `translateX(-${scrollAmount}px)`;
        updateArrows();
        updatePagination();
    }

    // Обновление состояния стрелок
    function updateArrows() {
        leftButton.classList.toggle('disabled', currentIndex === 0);
        rightButton.classList.toggle('disabled', currentIndex >= totalImages - imagesPerSlide);
    }

    // Создание точек пагинации
    function createPagination() {
        paginationContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === Math.floor(currentIndex / imagesPerSlide)) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i * imagesPerSlide;
                updateSlider();
            });
            paginationContainer.appendChild(dot);
        }
    }

    // Обновление состояния точек пагинации
    function updatePagination() {
        const dots = paginationContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / imagesPerSlide));
        });
    }

    // Добавление обработчиков событий на кнопки
    leftButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= imagesPerSlide;
            currentIndex = Math.max(0, currentIndex);
            updateSlider();
        }
    });

    rightButton.addEventListener('click', () => {
        if (currentIndex < totalImages - imagesPerSlide) {
            currentIndex += imagesPerSlide;
            currentIndex = Math.min(totalImages - imagesPerSlide, currentIndex);
            updateSlider();
        }
    });

    // Инициализация слайдера
    updateImagesPerSlide();
    window.addEventListener('resize', updateImagesPerSlide);
});
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slder-cad');
    const cadImgContainer = slider.querySelector('.cad-img');
    const images = cadImgContainer.querySelectorAll('img');
    const leftButton = slider.querySelector('#left');
    const rightButton = slider.querySelector('#right');
    const paginationContainer = slider.querySelector('.pagination');

    let currentIndex = 0;
    let imagesPerSlide = calculateImagesPerSlide(); // Динамическое вычисление изображений на слайд
    const totalImages = images.length;
    let totalPages = Math.ceil(totalImages / imagesPerSlide);

    // Пересчет количества изображений при изменении размера окна
    function calculateImagesPerSlide() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }

    // Обновление количества изображений на слайд и пагинации при изменении размера окна
    function handleResize() {
        imagesPerSlide = calculateImagesPerSlide();
        totalPages = Math.ceil(totalImages / imagesPerSlide);
        updateSlider();
        createPagination();
    }

    // Обновление слайдера при изменении текущего индекса
    function updateSlider() {
        const scrollAmount = currentIndex * cadImgContainer.clientWidth;
        cadImgContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        updateArrows();
        updatePagination();
    }

    // Обновление состояния стрелок
    function updateArrows() {
        leftButton.classList.toggle('disabled', currentIndex === 0);
        rightButton.classList.toggle('disabled', currentIndex >= totalPages - 1);
    }

    // Создание точек пагинации
    function createPagination() {
        paginationContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            paginationContainer.appendChild(dot);
        }
    }

    // Обновление состояния точек пагинации
    function updatePagination() {
        const dots = paginationContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Добавление обработчиков событий на кнопки
    leftButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateSlider();
        }
    });

    rightButton.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex += 1;
            updateSlider();
        }
    });

    // Инициализация слайдера
    createPagination();
    updateSlider();

    // Событие для пересчета при изменении размера окна
    window.addEventListener('resize', handleResize);
});















document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal .close');
    const prevButton = document.querySelector('.modal .prev');
    const nextButton = document.querySelector('.modal .next');
    const images = document.querySelectorAll('.cad-img img, .slider-slide img'); // Коллекция изображений
    let currentIndex = 0;

    // Функция для открытия модалки с выбранным изображением
    function openModal(index) {
        currentIndex = index;
        modalImage.src = images[currentIndex].src;
        modal.style.display = 'block';
    }

    // Обработчик клика по изображению
    images.forEach((image, index) => {
        image.addEventListener('click', () => openModal(index));
    });

    // Закрытие модалки
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Обработчик кнопки "Назад"
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        modalImage.src = images[currentIndex].src;
    });

    // Обработчик кнопки "Вперед"
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        modalImage.src = images[currentIndex].src;
    });

    // Закрытие модалки при клике вне изображения
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});