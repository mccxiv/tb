import {daysToMs} from './helpers';

let counter = 0;

const state = {
  requests: {
    channel1: 'timestamp'
  },
  messages: []
}

setInterval(() => {
  console.log('New messsages: ' + counter);
  counter = 0;
}, 30000);

export async function saveMessage(channel, user, message) {
  counter++;
  if (channel.charAt(0) === '#') channel = channel.substring(1);

  const data = {channel, user, message, at: Date.now()};
  state.messages.push(data);
}

export function getMessages(channel, after, before, limit, username) {
  return state.messages
    .filter(message => {
      const channelMatch = message.channel === channel;
      const afterMet = after ? message.at > after : true
      const beforeMet = before ? message.at < before : true
      const usernameMet = username ? message.user.username === username : true
      return channelMatch && afterMet && beforeMet && usernameMet
    })
    .slice(0, limit);
}

export function saveChannelRequest(channel) {
  state.requests[channel] = Date.now();
}

export function requestedRecently() {
  return Object.entries(state.requests)
    .filter(([, at]) => at > Date.now() - daysToMs(0.5))
    .map(([channel]) => channel);
}

export async function deleteOldMessages() {
  const twoDaysAgo = Date.now() - daysToMs(0.5);
  state.messages = state.messages.filter(message => message.at > twoDaysAgo);
}
