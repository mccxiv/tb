import chat from './chat';
import {requestedRecently} from './store';

export async function leaveOldChannels() {
  const noHashChannels = chat.channels.map((c) => c.substring(1));
  const recent = await requestedRecently();
  const oldChannels = missingFromFirst(recent, noHashChannels);
  oldChannels.forEach((channel) => chat.part(channel));
}

export function nowInSeconds() {
  return Math.round(Date.now() / 1000);
}

export function daysToSec(days) {
  return days * 24 * 60 * 60;
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