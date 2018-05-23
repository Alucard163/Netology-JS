'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/chat');

const chat = document.querySelector('.chat');
const chatStatusElem = chat.querySelector('.chat-status');
const msgSubmit = chat.querySelector('.message-submit');
const msgContent = chat.querySelector('.messages-content');

const [MESSAGE_OTHER, MESSAGE_PERSONAL, MESSAGE_NOTICE, MESSAGE_LOADING] = ['other', 'personal', 'notice', 'loading'];

ws.addEventListener('open', statusSuccess);
ws.addEventListener('message', newMsg);
ws.addEventListener('close', statusOffline);

window.addEventListener('beforeunload', () => {
  ws.close(1000, 'User left');
});
msgSubmit.addEventListener('click', sendMsg);

document.querySelector('.messages').style.overflowY = 'auto';
msgContent.style.height = '100%';

function statusSuccess() {
  chatStatusElem.innerText = chatStatusElem.dataset.online;
  addMsg('User online', MESSAGE_NOTICE);
  msgSubmit.disabled = false;
}

function statusOffline() {
  chatStatusElem.innerText = chatStatusElem.dataset.offline;
  addMsg('User offline', MESSAGE_NOTICE);
  msgSubmit.disabled = true;
}

function newMsg(event) {
  if (event.data !== '...' ) {
    const loadingMessage = msgContent.querySelector('.message.loading');

    if (loadingMessage) {
      loadingMessage.parentNode.removeChild(loadingMessage);
    }

    addMsg(event.data, MESSAGE_OTHER);
  } else {
    addMsg(event.data, MESSAGE_LOADING);
  }
}

function sendMsg(event) {
  event.preventDefault();
  const messageInput = chat.querySelector('.message-input');
  const message = messageInput.value;

  if (message !== '') {
    addMsg(message, MESSAGE_PERSONAL);
    console.log(currTime());
    ws.send(message);

    messageInput.value = '';
  }
}

function currTime() {
  const now = new Date();
  return now.toLocaleTimeString('ru-RU', { hour12: false }).substring(0, 5);
}

function addMsg(message = '', messageType = MESSAGE_SELF, time = currTime()) {
  const msgTemplate = returnTemplate(messageType);

    console.log(msgTemplate, messageType);
    msgTemplate.querySelector('.message-text').innerText = message;

    if (messageType !== MESSAGE_NOTICE) {
      msgTemplate.querySelector('.timestamp').innerText = time;
    }

    msgContent.appendChild(msgTemplate);
}

function returnTemplate(messageType = MESSAGE_OTHER) {
  const templates = chat.querySelector('.messages-templates');

  switch (messageType) {
    case MESSAGE_PERSONAL:
      return templates.querySelector('.message.message-personal').cloneNode(true);
    case MESSAGE_NOTICE:
      return templates.querySelector('.message.message-status').cloneNode(true);
    case MESSAGE_LOADING:
      return templates.querySelector('.message.loading').cloneNode(true);
    default:
      return Array.from(templates.querySelectorAll('.message')).find(template => {
        if (template.classList.length === 1) return template;
      }).cloneNode(true);
  }
}