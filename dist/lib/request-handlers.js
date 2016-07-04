'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.respond = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var respond = exports.respond = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var channel, after, before, limit;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            channel = req.params.channel;
            after = validate.after(req.query.after);
            before = validate.before(req.query.before);
            limit = validate.limit(req.query.limit);

            if (channel) {
              _context.next = 8;
              break;
            }

            res.status(400).json({ error: 'Missing channel.' });
            _context.next = 20;
            break;

          case 8:
            res.header('Content-Type', 'application/json');
            _context.prev = 9;
            _context.t0 = res;
            _context.next = 13;
            return (0, _store.getMessagesJson)(channel, after, before, limit);

          case 13:
            _context.t1 = _context.sent;

            _context.t0.send.call(_context.t0, _context.t1);

            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t2 = _context['catch'](9);
            res.status(500).json({ error: 'Server error, sorry!' });
          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 17]]);
  }));

  return function respond(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.logRequest = logRequest;
exports.joinChannel = joinChannel;

var _chat = require('./chat');

var _chat2 = _interopRequireDefault(_chat);

var _helpers = require('./helpers');

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = {
  after: function after(timestamp) {
    timestamp = Number(timestamp);
    if (!(0, _isInteger2.default)(timestamp)) {
      var oneHour = 1000 * 60 * 60;
      timestamp = Date.now() - oneHour;
    }
    return timestamp;
  },
  before: function before(timestamp) {
    timestamp = Number(timestamp);
    return (0, _isInteger2.default)(timestamp) ? timestamp : Date.now();
  },
  limit: function limit(number) {
    number = Number(number);
    return (0, _isInteger2.default)(number) ? number : 30;
  }
};

function logRequest(_ref, res, next) {
  var channel = _ref.params.channel;

  console.log('Requested channel: ' + channel);
  if (channel) (0, _store.saveChannelRequest)(channel.toLowerCase());
  next();
}

function joinChannel(_ref2, res, next) {
  var channel = _ref2.params.channel;

  if (channel && !(0, _helpers.isConnected)(channel)) _chat2.default.join(channel);
  next();
}