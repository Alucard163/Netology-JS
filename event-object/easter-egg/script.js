'use strict';

    const navigation = document.getElementsByTagName('nav')[0];
    const unit = document.getElementsByClassName('secret')[0];
    const secretWord = 'KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ';
    const msg = [];
  
    function showMagic(event) {
      msg.push(event.code);
  
      if (msg.join('') !== secretWord) {
        if (secretWord.indexOf(msg.join('')) === -1) {
          msg.length = 0;
        }
      } else {
        unit.classList.add('visible');
      }
    }
  
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
        navigation.classList.toggle('visible');
      }
      showMagic(event);
    });
