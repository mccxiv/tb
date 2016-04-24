import {startServer} from './lib/server';
import {startChatClient} from './lib/chat';
import {deleteOldMessages} from './lib/store';
import {leaveOldChannels, minutesToMs} from './lib/helpers';

startServer();
startChatClient();
setInterval(deleteOldMessages, minutesToMs(4));
setInterval(leaveOldChannels, minutesToMs(4));