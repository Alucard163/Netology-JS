'use strict';
window.addEventListener('DOMContentLoaded', () => {

    const toDoList = document.querySelector('.todo-list');
    const done = toDoList.querySelector('.done');
    const undone = toDoList.querySelector('.undone');
    const inputElements = toDoList.querySelectorAll('input[type="checkbox"]');
  
    toDoList.addEventListener('change', (event) => {
      const parentTypeList = event.target.parentElement.parentElement;
      const removeCurrentInput = parentTypeList.removeChild(event.target.parentElement);
  
      if (parentTypeList.classList.contains('done')) {
        removeCurrentInput.firstElementChild.removeAttribute('checked');
        undone.insertBefore(removeCurrentInput, null);
      } else {
        removeCurrentInput.firstElementChild.setAttribute('checked', '');
        done.insertBefore(removeCurrentInput, null);
      }
  
      done.querySelectorAll('label').length === 0 ? done.style.display = "none" : done.style.display = "block";
      undone.querySelectorAll('label').length === 0 ? undone.style.display = "none" : undone.style.display = "block";
    });
  
  });