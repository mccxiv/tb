'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinQueued = joinQueued;

var _chat = require('./chat');

var queue = [];

setInterval(joinOne, 305);

function joinQueued(channel) {
  if (!queue.includes(channel)) queue.push(channel);else {
    // If it's already in queue, move it to the front
    queue.splice(queue.indexOf(channel), 1);
    queue.unshift(channel);
  }
}

function joinOne() {
  if (queue.length) (0, _chat.joinUnsafeNotQueued)(queue.shift());
}