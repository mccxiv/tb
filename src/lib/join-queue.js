import {joinUnsafeNotQueued} from './chat'

const queue = []

setInterval(joinOne, 2000)

export function joinQueued (channel) {
  if (!queue.includes(channel)) queue.push(channel)
  else {
    // If it's already in queue, move it to the front
    queue.splice(queue.indexOf(channel), 1)
    queue.unshift(channel)
  }
}

function joinOne () {
  if (queue.length) joinUnsafeNotQueued(queue.shift())
}

setInterval(() => {
  if (queue.length) console.log('Join queue length:', queue.length);
}, 10000);
