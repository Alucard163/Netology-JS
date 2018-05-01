'use strict';
const count = document.getElementById('counter');
const inc = document.getElementById('increment');
const dec = document.getElementById('decrement');
const res = document.getElementById('reset');

if (sessionStorage.countValue === undefined) {
  sessionStorage.countValue = 0;
}

count.textContent = sessionStorage.countValue;

inc.addEventListener('click', () => {
  count.textContent = ++sessionStorage.countValue;
});

dec.addEventListener('click', () => {
  count.textContent = sessionStorage.countValue <= 0 ? 0 : --sessionStorage.countValue;
});

res.addEventListener('click', () => {
  sessionStorage.countValue = 0;
  count.textContent = 0;
});
