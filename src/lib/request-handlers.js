import chat from './chat';
import {isConnected} from './helpers'
import {saveChannelRequest, getMessages} from './store';

export function logRequest({params: {channel}}, res, next) {
  console.log('Requested channel: ' + channel);
  if (channel) saveChannelRequest(channel.toLowerCase());
  next();
}

export function joinChannel({params: {channel}}, res, next) {
  if (channel && !isConnected(channel)) chat.join(channel);
  next();
}

export async function respond(req, res) {
  const channel = req.params.channel;
  const start = Number(req.query.start);
  const end = Number(req.query.end);
  const limit = Number(req.query.limit);
  const nums = [start, end, limit];
  if (!channel || nums.some((n) => Number.isNaN(n))) {
    res.status(400).json({error: 'Missing parameters.'});
  }
  else {
    try {res.json(await getMessages(channel, start, end, limit))}
    catch (e) {res.status(500).json({error: 'Server error, sorry!'})}
  }
}