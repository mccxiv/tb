'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOldMessages = exports.requestedRecently = exports.getMessagesJson = exports.saveMessage = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createTables = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var make, makeIndexes;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            makeIndexes = function makeIndexes() {
              db.run('CREATE INDEX IF NOT EXISTS at_index ON lines (at)');
              db.run('CREATE INDEX IF NOT EXISTS channel_index ON lines (channel)');
              db.run('CREATE INDEX IF NOT EXISTS channel_index ON lines (channel)');
            };

            make = 'CREATE TABLE IF NOT EXISTS ';

            db.run(make + 'lines (at INTEGER, channel TEXT, line TEXT)', makeIndexes);
            db.run(make + 'requests (channel TEXT UNIQUE, at INTEGER)');

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createTables() {
    return _ref.apply(this, arguments);
  };
}();

var saveMessage = exports.saveMessage = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(channel, user, message) {
    var data, statement, values;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            counter++;
            if (channel.charAt(0) === '#') channel = channel.substring(1);

            data = { channel: channel, user: user, message: message, at: Date.now() };
            statement = 'INSERT INTO lines VALUES(?, ?, ?)';
            values = [data.at, channel, (0, _stringify2.default)(data)];

            db.run(statement, values);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function saveMessage(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getMessagesJson = exports.getMessagesJson = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(channel, after, before, limit) {
    var statement, values;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            statement = 'SELECT * FROM lines WHERE ' + 'channel = ? AND at > ? AND at < ? ' + 'ORDER BY at DESC LIMIT ?';
            values = [channel, after, before, limit];
            return _context3.abrupt('return', new _promise2.default(function (resolve, reject) {
              var rows = [];

              db.each(statement, values, each, complete);

              function each(e, row) {
                if (e) reject(e);
                rows.push(row);
              }

              function complete(e) {
                if (e) reject(e);else {
                  var lines = rows.map(function (r) {
                    return r.line;
                  }).reverse();
                  resolve('[' + lines.join(',') + ']');
                }
              }
            }));

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getMessagesJson(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var requestedRecently = exports.requestedRecently = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
    var st, values;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            st = 'SELECT channel FROM requests WHERE at > ?';
            values = [Date.now() - (0, _helpers.daysToMs)(2)];
            return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {
              db.all(st, values, function (e, results) {
                if (e) reject(e);else resolve(results.map(function (r) {
                  return r.channel;
                }));
              });
            }));

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function requestedRecently() {
    return _ref4.apply(this, arguments);
  };
}();

var deleteOldMessages = exports.deleteOldMessages = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
    var twoDaysAgo, statement;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            twoDaysAgo = Date.now() - (0, _helpers.daysToMs)(2);
            statement = 'DELETE FROM lines WHERE at < ?';

            db.run(statement, [twoDaysAgo]);

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function deleteOldMessages() {
    return _ref5.apply(this, arguments);
  };
}();

exports.connectToDatabase = connectToDatabase;
exports.saveChannelRequest = saveChannelRequest;

var _sqlite = require('sqlite3');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = void 0;
var counter = 0;

setInterval(function () {
  console.log('New messsages: ' + counter);
  counter = 0;
}, 30000);

function connectToDatabase(host) {
  db = new _sqlite2.default.Database(host);
  createTables();
}

function saveChannelRequest(channel) {
  var st = 'INSERT OR REPLACE INTO requests VALUES(?, ?)';
  var values = [channel, Date.now()];
  db.run(st, values);
}