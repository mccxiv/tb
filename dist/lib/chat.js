'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startChatClient = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var joinInitialChannels = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _store.requestedRecently)();

          case 3:
            _context.t0 = chat.join.bind(chat);

            _context.sent.forEach(_context.t0);

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t1 = _context['catch'](0);
            setTimeout(joinInitialChannels, 5000);
          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function joinInitialChannels() {
    return _ref.apply(this, arguments);
  };
}();

var startChatClient = exports.startChatClient = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            chat.connect();

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function startChatClient() {
    return _ref2.apply(this, arguments);
  };
}();

var _tmi = require('tmi.js');

var _tmi2 = _interopRequireDefault(_tmi);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chat = new _tmi2.default.client({ connection: { reconnect: true } });

chat.on('action', _store.saveMessage);
chat.on('chat', _store.saveMessage);
chat.on('cheer', _store.saveMessage);
chat.once('connected', joinInitialChannels);

exports.default = chat;