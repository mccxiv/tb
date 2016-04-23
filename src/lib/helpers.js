import {getLastRequestTime} from './store';

export async function leaveOldChannels() {
  if (!(await hasBeenRequestedRecently())) {

  }
}

export function daysToMs(days) {
  return minutesToMs(days * 24 * 60);
}

export function minutesToMs(minutes) {
  return minutes * 60 * 1000;
}