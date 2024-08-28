// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const cadmg = document.querySelector(".cad-img-small, .cad-img");
fastamg = cadmg.querySelectorAll("img")[0];
cadmgicon = document.querySelectorAll(".slder-cad-small #right, .slder-cad-small #left, .slder-cad #right, .slder-cad #left");

let sdagstat = false, isDragging = false, prevpageX, prevScrollLeft, hhhggg ;

const showHidicon = () => {
    let screllWidth = cadmg.scrollWidth - cadmg.clientWidth;
    cadmgicon[0].style.display = cadmg.scrollLeft == 0 ? "none" : "block";
    cadmgicon[1].style.display = cadmg.scrollLeft == screllWidth ? "none" : "block";
}

cadmgicon.forEach(icon => {
    icon.addEventListener("click", () => {
        let fastamGwidth = fastamg.clientWidth + 14;
        cadmg.scrollLeft += icon.id == "left" ? -fastamGwidth : fastamGwidth;
        setTimeout(() => showHidicon(), 60);
    })
});

const autoSlide = () => {
    if(cadmg.scrollLeft == (cadmg.scrollWidth - cadmg.clientWidth)) return;

    hhhggg = Math.abs(hhhggg);
    let firstImgWidth = fastamg.clientWidth + 14;
    let vaIdiffernce = firstImgWidth - hhhggg;

    if(cadmg.scrollLeft > prevScrollLeft){
       return cadmg.scrollLeft += hhhggg > firstImgWidth / 3 ? vaIdiffernce : -hhhggg;
    }
    cadmg.scrollLeft -= hhhggg > firstImgWidth / 3 ? vaIdiffernce : -hhhggg;
}

const dragstat = (e) => {
    sdagstat = true;
    prevpageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = cadmg.scrollLeft

}
const dragging =(e) => {
    if(!sdagstat) return;
    e.preventDefault()
    isDragging = true;
    cadmg.classList.add("dragging");
    hhhggg =  (e.pageX || e.touches[0].pageX) -  prevpageX ;
    cadmg.scrollLeft = prevScrollLeft - hhhggg;
    showHidicon();
}

const dragstp = () => {
    sdagstat = false;
    cadmg.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

cadmg.addEventListener("mousedown", dragstat);
cadmg.addEventListener("touchstart", dragstat);

cadmg.addEventListener("mousemove",dragging );
cadmg.addEventListener("touchmove",dragging );

cadmg.addEventListener("mouseup",dragstp);
cadmg.addEventListener("mouseleave",dragstp);
cadmg.addEventListener("touchend",dragstp);










const btns = document.querySelectorAll(".acc-btn-docs, .acc-btn");

// fn
function accordion() {
    // this = the btn | icon & bg changed
    this.classList.toggle("is-open");

    // the acc-content
    const content = this.nextElementSibling;

    // IF open, close | else open
    if (content.style.maxHeight) content.style.maxHeight = null;
    else content.style.maxHeight = content.scrollHeight + "px";
}

// event
btns.forEach((el) => el.addEventListener("click", accordion));



















document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slider-slide');
    let currentIndex = 0;
  
    // Обработчики событий для кнопок
    document.getElementById('left').addEventListener('click', function () {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      updateSlider();
    });
  
    document.getElementById('right').addEventListener('click', function () {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateSlider();
    });
  
    function updateSlider() {
      slides.forEach((slide, index) => {
        slide.style.display = (index === currentIndex) ? 'block' : 'none';
      });
    }
  });
  
  
  