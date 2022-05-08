import chat from './chat';
import {requestedRecently} from './store';

export async function leaveOldChannels() {
  const noHashChannels = chat.channels.map((c) => c.substring(1));
  const recent = requestedRecently();
  const oldChannels = missingFromFirst(recent, noHashChannels);
  oldChannels.forEach((channel) => chat.part(channel));
}

export function daysToMs(days) {
  return minutesToMs(days * 24 * 60);
}

export function minutesToMs(minutes) {
  return minutes * 60 * 1000;
}

export function missingFromFirst(firstArr, secondArr) {
  return secondArr.filter((element) => !firstArr.includes(element));
}

export function isConnected(channel) {
  return chat.channels.includes('#' + channel);
}

export function allowCORS(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
}
