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
