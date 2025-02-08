const buttons = document.querySelectorAll('.acc-btn');
const faqBlocks = document.querySelectorAll('.acc-content');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const content = faqBlocks[index];

        // Если блок уже открыт – закрываем его
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
            content.style.maxHeight = "0px";
        } else {
            // Закрываем все блоки
            faqBlocks.forEach(block => {
                block.style.maxHeight = "0px";
            });
            // Открываем текущий блок, устанавливая его высоту по содержимому
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// btns.forEach((el) => el.addEventListener("click", accordion));






document.addEventListener('DOMContentLoaded', function () {
  
    const sliders = document.querySelectorAll('.slder-cad');


    function initSlider(slider) {
        const cadImgContainer = slider.querySelector('.cad-img');
        const images = cadImgContainer.querySelectorAll('img');
        const leftButton = slider.querySelector('.buttons-slider .left');
        const rightButton = slider.querySelector('.buttons-slider .right');
        const paginationContainer = slider.querySelector('.buttons-slider .pagination');

        let currentIndex = 0;
        let imagesPerSlide = calculateImagesPerSlide();
        const totalImages = images.length;
        let totalPages = Math.ceil(totalImages / imagesPerSlide);

        function calculateImagesPerSlide() {
            if (window.innerWidth <= 992) return 1;
            return 3;
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
                if (i === Math.floor(currentIndex)) dot.classList.add('active');
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
                dot.classList.toggle('active', index === Math.floor(currentIndex));
            });
        }
        
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
        
        window.addEventListener('resize', () => {
            imagesPerSlide = calculateImagesPerSlide();
            totalPages = Math.ceil(totalImages / imagesPerSlide);
            updateSlider();
            createPagination();
        });

        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                openModal(index, slider, images);
            });
        });
        
        slider.syncUpdate = function(newIndex) {
            currentIndex = newIndex;
            updateSlider();
        };
        
        createPagination();
        updateSlider();
    }
    
    sliders.forEach(slider => initSlider(slider));
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal .close');
    const prevButton = document.querySelector('.modal .prev');
    const nextButton = document.querySelector('.modal .next');
    
    let activeSlider = null; 
    let modalImages = null;   
    let currentIndex = 0;    
    
    window.openModal = function (index, slider, imagesArray) {
        currentIndex = index;
        activeSlider = slider;
        modalImages = imagesArray;
        modalImage.src = modalImages[currentIndex].src;
        modal.style.display = 'block';
    };
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    prevButton.addEventListener('click', () => {
        if (!modalImages) return;
        currentIndex = (currentIndex === 0) ? modalImages.length - 1 : currentIndex - 1;
        modalImage.src = modalImages[currentIndex].src;
        if (activeSlider && typeof activeSlider.syncUpdate === 'function') {
            activeSlider.syncUpdate(currentIndex);
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (!modalImages) return;
        currentIndex = (currentIndex === modalImages.length - 1) ? 0 : currentIndex + 1;
        modalImage.src = modalImages[currentIndex].src;
        if (activeSlider && typeof activeSlider.syncUpdate === 'function') {
            activeSlider.syncUpdate(currentIndex);
        }
    });

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




































document.addEventListener("DOMContentLoaded", () => {
    // Гамбургер-меню
    const hamburgerMenu = document.querySelector("#mobile .hamburger-menu");
    const mobileNav = document.querySelector("#mobile .mobile-nav");

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", () => {
            mobileNav.classList.toggle("active");
            hamburgerMenu.classList.toggle("active");
        });
    }

    // Выпадающее меню (работает в обоих `header`)
    document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;
            dropdownMenu.classList.toggle("active");
        });
    });
});