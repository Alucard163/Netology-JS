'use strict';
list.addEventListener('click', btnAddItem);

function btnAddItem(event) {
  event.preventDefault();

  if (!event.target.classList.contains('add-to-cart')) {
    return;
  }

  const itemContent = {
    title: event.target.dataset.title,
    price: event.target.dataset.price
  };

  addToCart(itemContent);
}