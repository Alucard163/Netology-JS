'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.getElementById('tabs');
    const tabsNav = tabs.querySelector('.tabs-nav');
    const tabsContent = tabs.querySelector('.tabs-content');
    const items = tabsContent.children;
    const childItems = tabsNav.removeChild(tabsNav.firstElementChild);
  
    Array.from(items).forEach((article, i) => {
      article.classList.add('hidden');
      treatment(article, i + 1);
    });
  
    items[0].classList.remove('hidden');
  
    function treatment(article, index) {
      const tabIcon = article.dataset.tabIcon;
      const tabTitle = article.dataset.tabTitle;
      const itemsNav = childItems.cloneNode(true);
      const itemsLink = itemsNav.firstElementChild;
  
      itemsLink.classList.add(tabIcon);
      itemsLink.textContent = tabTitle;
  
      itemsLink.addEventListener('click', (event) => {
        event.preventDefault();
  
        const hrefLi = tabsNav.children;
        const currLi = event.target.parentElement;
        const currArticle = tabsContent.querySelector(`[data-tab-title=${event.target.textContent}]`);
  
        for (let item of hrefLi) {
          item.classList.remove('ui-tabs-active');
        }
  
        for (let itemArticle of items) {
          itemArticle.classList.add('hidden');
        }
  
        currLi.classList.add('ui-tabs-active');
        currArticle.classList.remove('hidden');
      });
  
      tabsNav.appendChild(itemsNav);
  
      if (index === 1) {
        itemsNav.classList.add('ui-tabs-active');
      }
    }
  
  });