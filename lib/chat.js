import tmi from 'tmi.js';

const chat = new tmi.client({connection: {reconnect: true}});
chat.connect();

chat.on('action', saveAction);
chat.on('chat', saveChat);

function saveAction(channel, user, message) {
  save({type: 'action', channel, user, message});
}

function saveChat(channel, user, message) {
  save({type: 'chat', channel, user, message});
}

function save() {

}

export default {join: chat.join, part: chat.part};