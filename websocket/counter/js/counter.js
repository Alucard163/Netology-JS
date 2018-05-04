'use strict';
const host = new WebSocket('wss://neto-api.herokuapp.com/counter');
const count = document.querySelector('.counter');
const err = document.querySelector('.errors');

window.addEventListener('beforeunload', () => {
  host.close(1000, 'Работа закончена.');
});

host.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  count.textContent = data.connections;
  err.textContent = data.errors;
});
