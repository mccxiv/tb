import chat from './chat';
import {isConnected, nowInSeconds} from './helpers'
import {saveChannelRequest, getMessages} from './store';

const validate = {
  after(timestamp) {
    if (!Number.isInteger(timestamp)) {
      const oneHour = 60 * 60;
      timestamp = nowInSeconds() - oneHour;
    }
    return timestamp;
  },
  before(timestamp) {
    return Number.isInteger(timestamp)? timestamp : nowInSeconds();
  },
  limit(number) {
    return Number.isInteger(number)? number : 20;
  }
};

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
  const after = validate.after(req.query.after);
  const before = validate.before(req.query.before);
  const limit = validate.limit(req.query.limit);
  if (!channel) res.status(400).json({error: 'Missing channel.'});
  else {
    try {res.json(await getMessages(channel, after, before, limit))}
    catch (e) {res.status(500).json({error: 'Server error, sorry!'})}
  }
}