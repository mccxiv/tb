import {isConnected} from './helpers'
import {joinQueued} from './join-queue'
import {saveChannelRequest, getMessages} from './store';

const validate = {
  after(timestamp) {
    timestamp = Number(timestamp);
    if (!Number.isInteger(timestamp)) {
      const oneHour = 1000 * 60 * 60;
      timestamp = Date.now() - oneHour;
    }
    return timestamp;
  },
  before(timestamp) {
    timestamp = Number(timestamp);
    return Number.isInteger(timestamp)? timestamp : Date.now();
  },
  limit(number) {
    number = Number(number);
    return Number.isInteger(number)? number : 30;
  },
  username(string) {
    string = typeof string === 'undefined' ? '' : String(string).trim();
    return String(string).length > 0 ? string : false;
  }
};

export function logRequest({params: {channel}}, res, next) {
  console.log('request >', channel);
  if (channel) saveChannelRequest(channel.toLowerCase());
  next();
}

export function joinChannel({params: {channel}}, res, next) {
  if (channel && !isConnected(channel)) joinQueued(channel);
  next();
}

export function respond(req, res) {
  const channel = req.params.channel;
  const after = validate.after(req.query.after);
  const before = validate.before(req.query.before);
  const limit = validate.limit(req.query.limit);
  const username = validate.username(req.query.username);
  if (!channel) res.status(400).json({error: 'Missing channel.'});
  else {
    res.header('Content-Type', 'application/json');
    const params = [channel.toLowerCase(), after, before, limit, username];
    try {res.send(getMessages(...params))}
    catch (e) {res.status(500).json({error: 'Server error, sorry!'})}
  }
}
