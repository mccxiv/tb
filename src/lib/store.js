import {daysToMs} from './helpers';

let counter = 0;

const state = {
  requests: {
    channel1: 'timestamp'
  },
  messages: []
}

setInterval(() => {
  if (counter) {
    console.log('Messages: ' + state.messages.length + ', per minute: ' + counter);
    counter = 0;
  }
}, 60000);

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
    .slice(limit * -1); // Slice from the back
}

export function saveChannelRequest(channel) {
  state.requests[channel] = Date.now();
}

export function requestedRecently() {
  return Object.entries(state.requests)
    .filter(([, at]) => at > Date.now() - daysToMs(2))
    .map(([channel]) => channel);
}

export function deleteOldMessages() {
  const twoDaysAgo = Date.now() - daysToMs(2);
  state.messages = state.messages.filter(message => message.at > twoDaysAgo);
}

export function deleteExcessMessagesPerChannel() {
  const maxMessagesPerChannel = 150
  const messageCount = {}
  state.messages = state.messages
    .reverse()
    .filter(message => {
      if (!messageCount[message.channel]) messageCount[message.channel] = 0
      if (messageCount[message.channel] < maxMessagesPerChannel) {
        messageCount[message.channel]++
        return true
      } else return false
    })
    .reverse()
}
