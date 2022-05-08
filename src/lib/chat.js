import tmi from 'tmi.js';
import {saveMessage, requestedRecently} from './store';
import {joinQueued} from './join-queue'

const chat = new tmi.client({connection: {reconnect: true}});

chat.on('action', saveMessage);
chat.on('chat', saveMessage);
chat.on('cheer', saveMessage);
chat.on('connected', joinInitialChannels);

async function joinInitialChannels() {
  try {requestedRecently().forEach(joinQueued)}
  catch(e) {setTimeout(joinInitialChannels, 5000)}
}

export async function startChatClient() {
  chat.connect();
}

export async function joinUnsafeNotQueued (channel) {
  console.log('join >', channel)
  chat.join(channel)
}

export default chat;
