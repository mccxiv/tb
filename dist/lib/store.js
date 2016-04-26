'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOldMessages = exports.requestedRecently = exports.saveChannelRequest = exports.getMessages = exports.saveMessage = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var createIndex = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return requests();

          case 2:
            _context.t0 = { channel: 1 };
            _context.t1 = { unique: true };

            _context.sent.createIndex(_context.t0, _context.t1);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function createIndex() {
    return ref.apply(this, arguments);
  };
}();

var messages = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return db;

          case 2:
            return _context2.abrupt('return', _context2.sent.collection('messages'));

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function messages() {
    return ref.apply(this, arguments);
  };
}();

var requests = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return db;

          case 2:
            return _context3.abrupt('return', _context3.sent.collection('requests'));

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function requests() {
    return ref.apply(this, arguments);
  };
}();

var saveMessage = exports.saveMessage = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(msgObject) {
    var collection;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            counter++;
            _context4.next = 3;
            return messages();

          case 3:
            collection = _context4.sent;
            return _context4.abrupt('return', collection.insertOne((0, _assign2.default)(msgObject, { at: Date.now() })));

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return function saveMessage(_x) {
    return ref.apply(this, arguments);
  };
}();

var getMessages = exports.getMessages = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(channel, startTime, endTime, limit) {
    var coll, query, c;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return messages();

          case 2:
            coll = _context5.sent;
            query = { channel: channel, at: { $gt: startTime, $lt: endTime } };
            _context5.next = 6;
            return coll.find(query).sort({ at: -1 }).limit(limit).sort({ at: 1 });

          case 6:
            c = _context5.sent;
            return _context5.abrupt('return', c.toArray());

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return function getMessages(_x2, _x3, _x4, _x5) {
    return ref.apply(this, arguments);
  };
}();

var saveChannelRequest = exports.saveChannelRequest = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(channel) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return requests();

          case 2:
            _context6.t0 = { channel: channel };
            _context6.t1 = { channel: channel, at: Date.now() };
            _context6.t2 = { upsert: true };
            return _context6.abrupt('return', _context6.sent.updateOne(_context6.t0, _context6.t1, _context6.t2));

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return function saveChannelRequest(_x6) {
    return ref.apply(this, arguments);
  };
}();

var requestedRecently = exports.requestedRecently = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
    var query, arrayPromise;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            query = { at: { $gt: Date.now() - (0, _helpers.daysToMs)(2) } };
            _context7.next = 3;
            return requests();

          case 3:
            _context7.t0 = query;
            _context7.next = 6;
            return _context7.sent.find(_context7.t0).toArray();

          case 6:
            arrayPromise = _context7.sent;
            _context7.next = 9;
            return arrayPromise;

          case 9:
            _context7.t1 = function (c) {
              return c.channel;
            };

            return _context7.abrupt('return', _context7.sent.map(_context7.t1));

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return function requestedRecently() {
    return ref.apply(this, arguments);
  };
}();

var deleteOldMessages = exports.deleteOldMessages = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
    var twoDaysAgo, coll, arr;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            twoDaysAgo = Date.now() - (0, _helpers.daysToMs)(2);
            _context8.next = 3;
            return messages();

          case 3:
            coll = _context8.sent;
            _context8.next = 6;
            return coll.deleteMany({ at: { $lt: twoDaysAgo } }).toArray();

          case 6:
            arr = _context8.sent;
            return _context8.abrupt('return', arr.length ? arr[0].at : false);

          case 8:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return function deleteOldMessages() {
    return ref.apply(this, arguments);
  };
}();

exports.connectToDatabase = connectToDatabase;

var _mongodb = require('mongodb');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var host = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/tb';
var db = _promise2.default.reject('Database not yet connected');
var counter = 0;

setInterval(function () {
  console.log('New messsages: ' + counter);
  counter = 0;
}, 30000);
createIndex();

function connectToDatabase(host) {
  db = _mongodb.MongoClient.connect(host);
}