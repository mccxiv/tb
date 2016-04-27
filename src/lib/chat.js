import tmi from 'tmi.js';
import {saveMessage, requestedRecently} from './store';

const chat = new tmi.client({connection: {reconnect: true}});

chat.on('action', saveAction);
chat.on('chat', saveChat);
chat.once('connected', joinInitialChannels);

async function saveAction(channel, user, message) {
  channel = channel.substring(1);
  try {await saveMessage({type: 'action', channel, user, message})}
  catch(e) {console.warn(e)}
}

async function saveChat(channel, user, message) {
  channel = channel.substring(1);
  try {await saveMessage({type: 'chat', channel, user, message})}
  catch(e) {console.warn(e)}
}

async function joinInitialChannels() {
  try {(await requestedRecently()).forEach(chat.join.bind(chat))}
  catch(e) {setTimeout(joinInitialChannels, 5000)}
}

export default chat;

export async function startChatClient() {
  chat.connect();
}