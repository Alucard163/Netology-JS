'use strict';

const slides = [
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg' , 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg'];

  const img=document.getElementById('currentPhoto');
  let item=0;
  img.src = slides[item];

function nextEvent() { 
         item++; 
        if (item >= slides.length) item=0;
        img.src = slides[item]; 
 /**/      
};
function prevEvent() {  
        item--;
       if (item<0) item=slides.length-1;
       img.src = slides[item];
};
document.getElementById('nextPhoto').onclick=nextEvent;
document.getElementById('prevPhoto').onclick=prevEvent;


