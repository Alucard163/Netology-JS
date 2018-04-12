'use strict';

    const piano = document.getElementsByClassName('set middle')[0];
    const keys = piano.getElementsByTagName('li');
    const melodies = ['first', 'second', 'third', 'fourth', 'fifth'];
    let type = 'middle';
  
    Array.from(keys).forEach((key, id) => {
      const audio = key.getElementsByTagName('audio')[0];
  
      document.addEventListener('keydown', (event) => {
        event.preventDefault();
  
        if (event.shiftKey) {
          type = 'lower';
          piano.classList.add('lower');
          piano.classList.remove('middle', 'higher');
        }
  
        if (event.altKey) {
          type = 'higher';
          piano.classList.add('higher');
          piano.classList.remove('middle', 'lower');
        }
      });
  
      document.addEventListener('keyup', (event) => {
        type = 'middle';
        piano.classList.add('middle');
        piano.classList.remove('higher', 'lower');
      });
  
      key.addEventListener('click', () => {
        audio.src = `./sounds/${type}/${melodies[id]}.mp3`;
        audio.play();
      });
    });
    
   
