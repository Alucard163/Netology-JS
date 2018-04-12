'use strict';

    const view = document.getElementById('view');
    const navigation = document.getElementById('nav');
    const gallery = navigation.getElementsByTagName('a');
  
    function setImage(event) {
      event.preventDefault();
  
      for (let item of gallery) {
        item.classList.remove('gallery-current');
      }
  
      event.currentTarget.classList.add('gallery-current');
      view.src = event.currentTarget.href;
    }
  
    for (let item of gallery) {
      item.addEventListener('click', setImage);
    }
  
