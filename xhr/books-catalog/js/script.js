'use strict';
const query = new XMLHttpRequest();
const content = document.getElementById('content');

query.addEventListener('load', renderCatalog);

query.open('GET', 'https://netology-fbb-store-api.herokuapp.com/book/');
query.send();

function renderCatalog(event) {
  const data = JSON.parse(event.target.responseText);

  content.innerHTML = Array.from(data).reduce((memo, item) => {
    return memo + `<li data-title="${item.title}" data-author="${item.author.name}" data-info="${item.info}" data-price="${item.price}">
                    <img src="${item.cover.small}" alt="${item.title}">
                  </li>`;
  }, '');
}