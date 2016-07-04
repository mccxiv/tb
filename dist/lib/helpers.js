'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leaveOldChannels = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var leaveOldChannels = exports.leaveOldChannels = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var noHashChannels, recent, oldChannels;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            noHashChannels = _chat2.default.channels.map(function (c) {
              return c.substring(1);
            });
            _context.next = 3;
            return (0, _store.requestedRecently)();

          case 3:
            recent = _context.sent;
            oldChannels = missingFromFirst(recent, noHashChannels);

            oldChannels.forEach(function (channel) {
              return _chat2.default.part(channel);
            });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function leaveOldChannels() {
    return _ref.apply(this, arguments);
  };
}();

exports.daysToMs = daysToMs;
exports.minutesToMs = minutesToMs;
exports.missingFromFirst = missingFromFirst;
exports.isConnected = isConnected;

var _chat = require('./chat');

var _chat2 = _interopRequireDefault(_chat);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function daysToMs(days) {
  return minutesToMs(days * 24 * 60);
}

function minutesToMs(minutes) {
  return minutes * 60 * 1000;
}

function missingFromFirst(firstArr, secondArr) {
  return secondArr.filter(function (element) {
    return !firstArr.includes(element);
  });
}

function isConnected(channel) {
  return _chat2.default.channels.includes('#' + channel);
}