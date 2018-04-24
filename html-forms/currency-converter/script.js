'use strict';
const XHR = new XMLHttpRequest();
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const result = document.getElementById('result');
const source = document.getElementById('source');
const input = document.getElementById('from');
const output = document.getElementById('to');

XHR.addEventListener('load', eventInit);

input.addEventListener('change', () => {
  currencyAmt(input, output);
});

output.addEventListener('change', () => {
  currencyAmt(input, output);
});

source.addEventListener('input', () => {
  currencyAmt(input, output);
});

XHR.open('GET', 'https://neto-api.herokuapp.com/currency');
XHR.send();

loader.classList.remove('hidden');

function eventInit(event) {
  if (event.target.status === 200) {
    const response = JSON.parse(event.target.responseText);

    content.classList.remove('hidden');
    loader.classList.add('hidden');

    dataHandler(response);
  }
}

function dataHandler(data) {
  for (let item of data) {
    const optionTmpl = `<option value="${item.value}" label="${item.code}">${item.title}</option>`;

    input.innerHTML += optionTmpl;
    output.innerHTML += optionTmpl;

    currencyAmt(input, output);
  }
}

function currencyAmt(fromCurr, toCurr) {
  const countinput = source.value * fromCurr.value;
  const textinput = fromCurr.options[fromCurr.selectedIndex].innerHTML;
  const textoutput = toCurr.options[toCurr.selectedIndex].innerHTML;

  result.value = `${source.value} ${textinput} => ${(countinput / toCurr.value).toFixed(2)} ${textoutput}`;
}