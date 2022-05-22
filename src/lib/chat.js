import tmi from 'tmi.js';
import {saveMessage} from './store';

const chat = new tmi.client({connection: {reconnect: true}});

chat.on('action', saveMessage);
chat.on('chat', saveMessage);
chat.on('cheer', saveMessage);

export async function startChatClient() {
  chat.connect();
}

export async function joinUnsafeNotQueued (channel) {
  console.log('join >', channel)
  try { await chat.join(channel) }
  catch (e) { console.log('join channel error >', e) }
}

export default chat;
