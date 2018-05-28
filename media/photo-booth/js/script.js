'use strict';
const app = document.querySelector('.app');
const list = document.querySelector('.list');
const controls = document.querySelector('.app .controls');
const stream = document.createElement('video');

initStream(); 


function initStream() {

  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then((stream) => {
      stream.autoplay = true;
      app.insertBefore(stream, controls);

      const btnPhoto = document.querySelector('#take-photo');

      stream.src = URL.createObjectURL(stream); 

      stream.addEventListener('canplay', (evt) => {

        controls.classList.add('visible');
        btnPhoto.addEventListener('click', (e) => {
          playing();
          takePicture();
        });
      });
    })
    .catch((err) => {
      const msgError = document.querySelector('#error-message');
      msgError.innerText = `Ошибка: ${err.name}: ${err.message} \n ${err.stack}`;
      msgError.classList.add('visible');
    });
}


function takePicture() {
  const canv = document.createElement('canvas');
  const ctx = canv.getContext('2d');

  canv.width = stream.videoWidth;
  canv.height = stream.videoHeight;

  ctx.drawImage(stream, 0, 0);

  canv.toBlob(blob => newImg(blob, list));
}

/**
 * Вопспроизводит звук
 * @param soundUrl
 */
function playing(soundUrl = './audio/click.mp3') {
  let player = document.querySelector('audio');
  if (!player) {
    player = document.createElement('audio');
    document.querySelector('.app').appendChild(player);
  }

  player.src = soundUrl;
  player.play();
}

/**
 * создает и добавляет в конец DOM-элемента container изображение
 * @param blob
 * @param container
 * @param imgDataUrl
 */
function newImg(blob, container) {

  function disableButton(button) {
    button.parentNode.removeChild(button);
  }

  const imgUrl = URL.createObjectURL(blob);

  const imageContainerHTML =
    `
      <figure>
        <img src="${imgUrl}">
        <figcaption>
          <a href="${imgUrl}" download="snapshot.png" target="_blank">
            <i class="material-icons">file_download</i>
          </a>
          <a><i class="material-icons">file_upload</i></a>
          <a><i class="material-icons">delete</i></a>
        </figcaption>
      </figure>
    `;

  container.insertAdjacentHTML('afterBegin', imageContainerHTML);

  const newImage = container.querySelector('figure:first-child');
  const downloadBtn = newImage.querySelector('a:nth-child(1)');
  downloadBtn.addEventListener('click', event => {
    disableButton(event.target.parentNode); 
  });

  const uploadBtn = newImage.querySelector('a:nth-child(2)');
  uploadBtn.addEventListener('click', event => {
    disableButton(event.target.parentNode); 
    const uploadImgRqst = new XMLHttpRequest();

    uploadImgRqst.addEventListener('loadend', (evnt) => {
      console.log(`Ответ сервера: ${uploadImgRqst.responseText}`);
    });

    uploadImgRqst.addEventListener('loadstart', (evnt) => {
      console.log(`Начата отправка данных`);
    });

    uploadImgRqst.open('POST', 'https://neto-api.herokuapp.com/photo-booth', true);

    const formData = new FormData();
    formData.append('image', blob);

    uploadImgRqst.send(formData);
  });

  const deleteBtn = newImage.querySelector('a:nth-child(3)');
  deleteBtn.addEventListener('click', event => {
    const image = event.target.parentNode.parentNode.parentNode;
    image.parentNode.removeChild(image);
    console.log(event.target.parentNode);
  });
}