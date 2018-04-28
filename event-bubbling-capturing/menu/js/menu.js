'use strict';

function toggleMenu(event) {
  const curr=event.currentTarget;
  if (curr.classList.contains('show')) {
    curr.classList.remove('show');
    curr.classList.add('hide');
  } else {
    curr.classList.add('show');
    curr.classList.remove('hide');
  }
}

function openLink(event) {
  event.preventDefault();
  console.log(this.textContent);
  event.stopPropagation();
}

function init(node) {
  node.addEventListener('click', toggleMenu);
}

function initLink(node) {
  if (node.dataset.toggle) {
    return;
  }
  node.addEventListener('click', openLink,true);
}

Array
  .from(document.querySelectorAll('.dropdown'))
  .forEach(init);

Array
  .from(document.querySelectorAll('a'))
  .forEach(initLink);
