'use strict';

const tabs = document.querySelectorAll('.tabs > nav a');
const tabContent = document.getElementById('content');
const preloader = document.getElementById('preloader');
const XHR = new XMLHttpRequest();

XHR.addEventListener('loadstart', () => {
  preloader.classList.remove('hidden');
});

XHR.addEventListener('load', () => {
  preloader.classList.add('hidden');
  tabContent.innerHTML = XHR.responseText;
});

for (let tab of tabs) {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    tabs.forEach((tab) => tab.classList.remove('active'));
    tab.classList.add('active');
    getDataTab(event.currentTarget.href);
  });
}

getDataTab(tabs[0].href);

function getDataTab(url) {
  XHR.open('GET', url);
  XHR.send();
}