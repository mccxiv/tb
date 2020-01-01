'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var handleNextRequestMaybe = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!currentReqRes && reqResQueue.length)) {
              _context.next = 9;
              break;
            }

            console.log('Responding... There are ' + reqResQueue.length + ' requests pending');
            currentReqRes = reqResQueue.shift();
            _context.prev = 3;
            _context.next = 6;
            return (0, _requestHandlers.respond)(currentReqRes.req, currentReqRes.res);

          case 6:
            _context.prev = 6;
            currentReqRes = null;return _context.finish(6);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3,, 6, 9]]);
  }));

  return function handleNextRequestMaybe() {
    return _ref.apply(this, arguments);
  };
}();

exports.queueRequest = queueRequest;

var _requestHandlers = require('./request-handlers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentReqRes = null;
var reqResQueue = [];

setInterval(handleNextRequestMaybe, 50);

function queueRequest(req, res) {
  reqResQueue.push({ req: req, res: res });
}