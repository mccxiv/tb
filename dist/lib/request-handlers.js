'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logRequest = logRequest;
exports.joinChannel = joinChannel;
exports.respond = respond;

var _chat = require('./chat');

var _chat2 = _interopRequireDefault(_chat);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logRequest(_ref, res, next) {
  var channel = _ref.params.channel;

  console.log('Requested channel: ' + channel);
  if (channel) (0, _store.saveChannelRequest)(channel.toLowerCase());
  next();
}

function joinChannel(_ref2, res, next) {
  var channel = _ref2.params.channel;

  if (channel && !_chat2.default.channels.includes('#' + channel)) _chat2.default.join(channel);
  next();
}

function respond(req, res) {
  res.send('Hello World.');
}