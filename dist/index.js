'use strict';

require('./lib/polyfills');

var _server = require('./lib/server');

var _store = require('./lib/store');

var _chat = require('./lib/chat');

var _helpers = require('./lib/helpers');

var PORT = process.env.PORT || 6255;
var DB = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/tb';

(0, _store.connectToDatabase)(DB);
(0, _server.startServer)(PORT);
(0, _chat.startChatClient)();
setInterval(_store.deleteOldMessages, (0, _helpers.minutesToMs)(4));
setInterval(_helpers.leaveOldChannels, (0, _helpers.minutesToMs)(4));