'use strict';
window.addEventListener('DOMContentLoaded', () => {

    const sliders = document.querySelectorAll('.slider');
  
    for (let slider of sliders) {
      sliderProcessing(slider);
    }
  
    function sliderProcessing(slider) {
      const sliderNav = slider.querySelector('.slider-nav');
      const first = sliderNav.querySelector('[data-action="first"]');
      const prev = sliderNav.querySelector('[data-action="prev"]');
      const next = sliderNav.querySelector('[data-action="next"]');
      const last = sliderNav.querySelector('[data-action="last"]');
      const slides = slider.querySelector('.slides');
  
      slides.firstElementChild.classList.add('slide-current');
  
      let currSlide = slides.querySelector('.slide-current');
  
      editCntrls(currSlide);
  
      sliderNav.addEventListener('click', (event) => {
        if (event.target.classList.contains('disabled')) {
          return;
        }
  
        currSlide.classList.remove('slide-current');
  
        switch(event.target) {
          case first:
            currSlide = slides.firstElementChild;
            break;
          case prev:
            currSlide = currSlide.previousElementSibling;
            break;
          case next:
            currSlide = currSlide.nextElementSibling;
            break;
          case last:
            currSlide = slides.lastElementChild;
            break;
        }
  
        editCntrls(currSlide);
  
        currSlide.classList.add('slide-current');
      });
  
      function editCntrls(currSlide) {
        first.classList.toggle('disabled', !currSlide.previousElementSibling);
        prev.classList.toggle('disabled', !currSlide.previousElementSibling);
        next.classList.toggle('disabled', !currSlide.nextElementSibling);
        last.classList.toggle('disabled', !currSlide.nextElementSibling);
      }
    }
  
  });