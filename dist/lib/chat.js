'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startChatClient = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var saveAction = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(channel, user, message) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _store.saveMessage)({ type: 'action', channel: channel, user: user, message: message });

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);
            console.warn(_context.t0);
          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 5]]);
  }));
  return function saveAction(_x, _x2, _x3) {
    return ref.apply(this, arguments);
  };
}();

var saveChat = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(channel, user, message) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _store.saveMessage)({ type: 'chat', channel: channel, user: user, message: message });

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2['catch'](0);
            console.warn(_context2.t0);
          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 5]]);
  }));
  return function saveChat(_x4, _x5, _x6) {
    return ref.apply(this, arguments);
  };
}();

var startChatClient = exports.startChatClient = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var recent;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            chat.connect();
            _context3.next = 3;
            return (0, _store.requestedRecently)();

          case 3:
            recent = _context3.sent;

            chat.once('connected', function () {
              return recent.forEach(chat.join.bind(chat));
            });

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function startChatClient() {
    return ref.apply(this, arguments);
  };
}();

var _tmi = require('tmi.js');

var _tmi2 = _interopRequireDefault(_tmi);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chat = new _tmi2.default.client({ connection: { reconnect: true } });

chat.on('action', saveAction);
chat.on('chat', saveChat);

exports.default = chat;