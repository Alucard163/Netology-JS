'use strict';

const fieldSignIn = document.querySelector('.sign-in-htm');
const fieldSignUp = document.querySelector('.sign-up-htm');
const errSignIn = fieldSignIn.querySelector('.error-message');
const errSignUp = fieldSignUp.querySelector('.error-message');

initFormSubmit(fieldSignIn, 'https://neto-api.herokuapp.com/signin', errSignIn, 'signin');
initFormSubmit(fieldSignUp, 'https://neto-api.herokuapp.com/signup', errSignUp, 'signup');

function initFormSubmit(form, urlPOST, messageBlock, type) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const records = new FormData(event.currentTarget);
    const convertToJson = {};

    for (const [key, value] of records) {
      convertToJson[key] = value;
    }

    const request = fetch(urlPOST, {
      body: JSON.stringify(convertToJson),
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    request
      .then((result) => {
        if (200 <= result.status && result.status < 300) {
          return result;
        }
        throw new Error(response.statusText);
      })
      .then((result) => result.json())
      .then((data) => {
        const messageOKText = type === 'signin' ? `Пользователь ${data.name} успешно авторизован` : `Пользователь ${data.name} успешно зарегистрирован`;
        messageBlock.value = data.error ? data.message : messageOKText;
      });

  });
}
