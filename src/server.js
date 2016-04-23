import express from 'express';
import chat from './lib/chat';
import {deleteOldMessages} from './lib/store';
import {logRequest, joinChannel, respond} from './lib/request-handlers';
import {leaveOldChannels, minutesToMs} from './lib/helpers';

const app = express();
app.get('/:channel', logRequest, joinChannel, respond);
app.listen(process.env.PORT || 80);
chat.connect();

setInterval(deleteOldMessages, minutesToMs(2));
setInterval(leaveOldChannels, minutesToMs(2));