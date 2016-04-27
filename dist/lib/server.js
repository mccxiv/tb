'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestHandlers = require('./request-handlers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startServer(port) {
  console.log('Server starting');
  var app = (0, _express2.default)();
  app.get('/:channel', _requestHandlers.logRequest, _requestHandlers.joinChannel, _requestHandlers.respond);
  app.set('json spaces', 2);
  app.listen(port);
}