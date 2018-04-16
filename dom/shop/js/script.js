'use strict';
const goodsAdd = document.querySelectorAll('.box > .add');
const goodsCount = document.getElementById('cart-count');
const totalValue = document.getElementById('cart-total-price');

window.addEventListener('load', () => {
  let costCounter = 0;
  let goodsCounter = 0;

  function addToCart(event) {
    goodsCounter++;
    costCounter += parseInt(event.currentTarget.dataset.price);

    goodsCount.innerHTML = goodsCounter;
    totalValue.innerHTML = getPriceFormatted(costCounter);
  }

  for (let event of goodsAdd) {
    event.addEventListener('click', addToCart);
  }
});