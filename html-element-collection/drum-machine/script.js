'use strict';
    const drumKits = document.getElementsByClassName('drum-kit__drum');
  
   for (let event of drumKits) {
        event.onclick = function () { 
        const audioEvent = this.getElementsByTagName('audio')[0];
        audioEvent.pause();
        audioEvent.currentTime=0;
        audioEvent.play();
      }
    }
