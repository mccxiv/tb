import chat from './chat';
import {saveChannelRequest} from './store';

export function logRequest({params: {channel}}, res, next) {
  console.log(channel, 'requested');
  if (channel) saveChannelRequest(channel.toLowerCase());
  next();
}

export function joinChannel({params: {channel}}, res, next) {
  if (channel) chat.join(channel);
  next();
}

export function respond(req, res) {
  res.send('Hello World.');
}