'use strict';
const host = new WebSocket('wss://neto-api.herokuapp.com/mouse');

host.addEventListener('open', (event) => {
  showBubbles(event.target);
});

document.addEventListener('click', (event) => {
  host.send(JSON.stringify({
    x: event.clientX,
    y: event.clientY
  }));
});
