'use strict';

const slides = [
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png' , 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png'];

const img = document.getElementById('slider');
let item = 0;

  setInterval(()=> {
        img.src = slides[item];
        item >= slides.length-1 ? item=0:item++;
    },5000);
