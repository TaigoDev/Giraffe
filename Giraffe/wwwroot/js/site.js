// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
let currentSlide = 0;

function changeSlide(n) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;

    currentSlide = (currentSlide + n + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-currentSlide * 100}%)`;
}


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