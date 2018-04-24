'use strict';
 window.addEventListener('DOMContentLoaded', () => {

    const unit = document.querySelector('.contentform');
    const output = document.getElementById('output');
    const unitName = unit.querySelectorAll('[name]');
    const sendBtn = unit.querySelector('.button-contact');
    const editBtn = output.querySelector('.button-contact');
    let entrance = 0;
  
    for (let data of unitName) {
      data.addEventListener('change', (event) => {
        if (event.currentTarget.name !== 'phone' && event.currentTarget.name !== 'email') {
          document.getElementById(event.currentTarget.name).value = event.currentTarget.value;
        }
  
        event.currentTarget.value !== '' ? entrance++ : entrance--;
  
        if (entrance === unitName.length) {
          sendBtn.removeAttribute('disabled');
          unit.removeAttribute('novalidate');
          unit.setAttribute('validate', '');
        } else {
          sendBtn.setAttribute('disabled', '');
          unit.setAttribute('novalidate', '');
          unit.removeAttribute('validate');
        }
      });
  
      if (data.name === 'zip') {
        data.addEventListener('input', (event) => {
          event.currentTarget.value = event.currentTarget.value.replace(/\D/, '');
        });
      }
    }
  
    sendBtn.addEventListener('click', (event) => {
      event.preventDefault();
      unit.classList.add('hidden');
      output.classList.remove('hidden');
    });
  
    editBtn.addEventListener('click', (event) => {
      event.preventDefault();
      output.classList.add('hidden');
      unit.classList.remove('hidden');
    });
  
  }); 
