'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

require('./lib/polyfills');

var _server = require('./lib/server');

var _store = require('./lib/store');

var _chat = require('./lib/chat');

var _helpers = require('./lib/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 6255;
var DB = _path2.default.resolve(__dirname, '..', 'db.sqlite');

(0, _store.connectToDatabase)(DB);
(0, _server.startServer)(PORT);
(0, _chat.startChatClient)();
setInterval(_store.deleteOldMessages, (0, _helpers.minutesToMs)(4));
setInterval(_helpers.leaveOldChannels, (0, _helpers.minutesToMs)(4));