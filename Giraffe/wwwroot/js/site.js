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
    // Получаем все слайдеры по классу
    const sliders = document.querySelectorAll('.slder-cad');

    // Функция инициализации одного слайдера
    function initSlider(slider) {
        // Находим элементы внутри данного слайдера
        const cadImgContainer = slider.querySelector('.cad-img');
        const images = cadImgContainer.querySelectorAll('img');
        const leftButton = slider.querySelector('.buttons-slider .left');
        const rightButton = slider.querySelector('.buttons-slider .right');
        const paginationContainer = slider.querySelector('.buttons-slider .pagination');

        let currentIndex = 0;
        let imagesPerSlide = calculateImagesPerSlide();
        const totalImages = images.length;
        let totalPages = Math.ceil(totalImages / imagesPerSlide);

        // Функция для вычисления количества изображений на слайд
        function calculateImagesPerSlide() {
            if (window.innerWidth <= 992) return 1;
            return 3;
        }

        // Обновление слайдера при изменении индекса
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

        // Создание пагинации
        function createPagination() {
            paginationContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === Math.floor(currentIndex)) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                });
                paginationContainer.appendChild(dot);
            }
        }

        // Обновление пагинации
        function updatePagination() {
            const dots = paginationContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === Math.floor(currentIndex));
            });
        }

        // Обработчики для стрелок
        leftButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        rightButton.addEventListener('click', () => {
            if (currentIndex < totalPages - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        // Обработка изменения размеров окна
        window.addEventListener('resize', () => {
            imagesPerSlide = calculateImagesPerSlide();
            totalPages = Math.ceil(totalImages / imagesPerSlide);
            updateSlider();
            createPagination();
        });

        // Назначаем обработчик клика по каждому изображению слайдера
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                // Функция openModal будет определена глобально (см. ниже)
                openModal(index, slider, images);
            });
        });

        // Добавляем публичный метод для синхронизации с модалкой
        slider.syncUpdate = function(newIndex) {
            currentIndex = newIndex;
            updateSlider();
        };

        // Инициализация слайдера
        createPagination();
        updateSlider();
    }

    // Инициализируем каждый слайдер на странице
    sliders.forEach(slider => initSlider(slider));
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal .close');
    const prevButton = document.querySelector('.modal .prev');
    const nextButton = document.querySelector('.modal .next');

    // Глобальные переменные для синхронизации
    let activeSlider = null;  // Ссылка на слайдер, из которого открыли модалку
    let modalImages = null;   // Массив изображений этого слайдера
    let currentIndex = 0;     // Индекс текущего изображения в модалке

    // Функция открытия модального окна
    // Принимает индекс, ссылку на слайдер и массив изображений этого слайдера
    window.openModal = function (index, slider, imagesArray) {
        currentIndex = index;
        activeSlider = slider;
        modalImages = imagesArray;
        modalImage.src = modalImages[currentIndex].src;
        modal.style.display = 'block';
    };

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Обработчик для перехода к предыдущему изображению
    prevButton.addEventListener('click', () => {
        if (!modalImages) return;
        currentIndex = (currentIndex === 0) ? modalImages.length - 1 : currentIndex - 1;
        modalImage.src = modalImages[currentIndex].src;
        // Синхронизируем слайдер, если он открыт
        if (activeSlider && typeof activeSlider.syncUpdate === 'function') {
            activeSlider.syncUpdate(currentIndex);
        }
    });

    // Обработчик для перехода к следующему изображению
    nextButton.addEventListener('click', () => {
        if (!modalImages) return;
        currentIndex = (currentIndex === modalImages.length - 1) ? 0 : currentIndex + 1;
        modalImage.src = modalImages[currentIndex].src;
        // Синхронизируем слайдер
        if (activeSlider && typeof activeSlider.syncUpdate === 'function') {
            activeSlider.syncUpdate(currentIndex);
        }
    });

    // Также можно закрывать модалку при клике вне изображения
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});















document.addEventListener('DOMContentLoaded', function () {

    const sliderSlides = document.querySelectorAll('.slider-slide');
    const paginationContainer = document.querySelector('.pagination');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    let currentIndex = 0;

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

    function updateImagesPerSlide() {
        imagesPerSlide = window.innerWidth <= 768 ? 1 : 2;
        totalPages = Math.ceil(totalImages / imagesPerSlide);
        updateSlider();
        createPagination();
    }

    function updateSlider() {
        const scrollAmount = currentIndex * (images[0].offsetWidth + 14);
        cadSmallImgContainer.style.transform = `translateX(-${scrollAmount}px)`;
        updateArrows();
        updatePagination();
    }

    function updateArrows() {
        leftButton.classList.toggle('disabled', currentIndex === 0);
        rightButton.classList.toggle('disabled', currentIndex >= totalImages - imagesPerSlide);
    }

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

    function updatePagination() {
        const dots = paginationContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / imagesPerSlide));
        });
    }

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
    let imagesPerSlide = calculateImagesPerSlide();
    const totalImages = images.length;
    let totalPages = Math.ceil(totalImages / imagesPerSlide);

    function calculateImagesPerSlide() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }

    function handleResize() {
        imagesPerSlide = calculateImagesPerSlide();
        totalPages = Math.ceil(totalImages / imagesPerSlide);
        updateSlider();
        createPagination();
    }

    function updateSlider() {
        const scrollAmount = currentIndex * cadImgContainer.clientWidth;
        cadImgContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        updateArrows();
        updatePagination();
    }

    function updateArrows() {
        leftButton.classList.toggle('disabled', currentIndex === 0);
        rightButton.classList.toggle('disabled', currentIndex >= totalPages - 1);
    }

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

    function updatePagination() {
        const dots = paginationContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

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

    createPagination();
    updateSlider();

    window.addEventListener('resize', handleResize);
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal .close');
    const prevButton = document.querySelector('.modal .prev');
    const nextButton = document.querySelector('.modal .next');
    const images = document.querySelectorAll('.cad-img img, .slider-slide img');
    let currentIndex = 0;

    function openModal(index) {
        currentIndex = index;
        modalImage.src = images[currentIndex].src;
        modal.style.display = 'block';
    }

    images.forEach((image, index) => {
        image.addEventListener('click', () => openModal(index));
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        modalImage.src = images[currentIndex].src;
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        modalImage.src = images[currentIndex].src;
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});