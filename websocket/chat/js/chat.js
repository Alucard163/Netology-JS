'use strict';

const chat = document.querySelector('.chat');
const chatItem = init(chat);
const host = new WebSocket('wss://neto-api.herokuapp.com/chat');

chatItem.content.setAttribute('style', 'overflow-y: auto;');

host.addEventListener('open', () => {
  initStatus('Пользователь появился в сети');
  chatItem.status.textContent = chatItem.status.dataset.online;
  chatItem.submit.disabled = false;
});

host.addEventListener('close', () => {
  initStatus('Пользователь не в сети');
  chatItem.status.textContent = chatItem.status.dataset.offline;
  chatItem.submit.disabled = true;
});

host.addEventListener('message', (event) => {
  const data = event.data;
  const typingMessage = chatItem.templates.loading;
  const messageUser = chatItem.templates.messageUser.cloneNode(true);

  if (data === '...') {
    chatItem.content.appendChild(typingMessage).scrollIntoView({block: "end", behavior: "smooth"});
  } else {
    msgSend(messageUser, data);
    chatItem.content.removeChild(typingMessage);
    chatItem.content.appendChild(messageUser).scrollIntoView({block: "end", behavior: "smooth"});
  }
});

chatItem.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = chatItem.input.value;
  const messageMy = chatItem.templates.messageMy.cloneNode(true);

  msgSend(messageMy,value);
  chatItem.content.appendChild(messageMy).scrollIntoView({block: "end", behavior: "smooth"});
  host.send(value);
  chatItem.form.reset();
});

function init(chatElem) {
  return {
    form: chatElem.querySelector('.message-box'),
    input: chatElem.querySelector('.message-input'),
    submit: chatElem.querySelector('.message-submit'),
    content:chatElem.querySelector('.messages-content'),
    status: chatElem.querySelector('.chat-status'),
    templates: {
      messageUser: chatElem.querySelector('[class="message"]'),
      messageMy: chatElem.querySelector('.message.message-personal'),
      loading: chatElem.querySelector('.message.loading').cloneNode(true),
      status: chatElem.querySelector('.message.message-status')
    }
  };
}

function initStatus(messageStatus) {
  const message = chatItem.templates.status.cloneNode(true);
  message.querySelector('.message-text').textContent = messageStatus;
  chatItem.content.appendChild(message);
}

function msgSend(who, data) {
  const time = new Date();
  const hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  who.querySelector('.message-text').textContent = data;
  who.querySelector('.timestamp').textContent = `${hour}:${minutes}`;
}