'use strict';
window.addEventListener('DOMContentLoaded', () => {

    const unitList = document.querySelector('.list-block');
    const unitCheckbox = unitList.querySelectorAll('input[type="checkbox"]');
    const unitOutput = document.querySelector('output');
    let sum = 0;
  
    unitCheckbox.forEach((unit) => {
      if (unit.checked) {
        sum++;
      }
  
      unit.addEventListener('change', (event) => {
        event.currentTarget.checked ? sum++ : sum--;
        unitOutput.value = `${sum} из ${unitCheckbox.length}`;
        sum === unitCheckbox.length ? unitList.classList.add('complete') : unitList.classList.remove('complete');
      });
    });
  
    unitOutput.value = `${sum} из ${unitCheckbox.length}`;
  
  });