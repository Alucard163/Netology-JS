'use strict';

    const player = document.getElementsByClassName('mediaplayer')[0];
    const audio = player.getElementsByTagName('audio')[0];
    const title = player.getElementsByClassName('title')[0];
    const pauseBtn = player.getElementsByClassName('playstate')[0];
    const stopBtn = player.getElementsByClassName('stop')[0];
    const prevBtn = player.getElementsByClassName('back')[0];
    const nextBtn = player.getElementsByClassName('next')[0];
    const tracks = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];
    let index = 0;
  
    function setCurrentTrack() {
      audio.src = `./mp3/${tracks[index]}.mp3`;
      title.title = tracks[index];
  
      if (player.classList.contains('play')) {
        audio.play()
      }
    }
  
      pauseBtn.onclick = () => {
      player.classList.contains('play') ? audio.pause() : audio.play();
      player.classList.toggle('play');
    };
  
    stopBtn.onclick = () => {
      if (player.classList.contains('play')) {
        player.classList.remove('play');
      }
  
      audio.pause();
      audio.currentTime = 0;
    };
  
    prevBtn.onclick = () => {
      if (index <= 0) {
        index = tracks.length - 1;
      } else {
        index--;
      }
      setCurrentTrack();
    }
  
    nextBtn.onclick = () => {
      if (index >= tracks.length - 1) {
        index = 0;
      } else {
        index++;
      }
      setCurrentTrack();
    }
  
