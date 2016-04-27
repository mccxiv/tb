import tmi from 'tmi.js';
import {saveMessage, requestedRecently} from './store';

const chat = new tmi.client({connection: {reconnect: true}});

chat.on('action', saveMessage);
chat.on('chat', saveMessage);
chat.once('connected', joinInitialChannels);

async function joinInitialChannels() {
  try {(await requestedRecently()).forEach(chat.join.bind(chat))}
  catch(e) {setTimeout(joinInitialChannels, 5000)}
}

export async function startChatClient() {
  chat.connect();
}

export default chat;