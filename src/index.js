import './lib/polyfills';
import {startServer} from './lib/server';
import {startChatClient} from './lib/chat';
import { deleteOldMessages, deleteExcessMessagesPerChannel } from './lib/store'
import {leaveOldChannels, minutesToMs} from './lib/helpers';

const PORT = process.env.PORT || 6255;

// connectToDatabase(DB);
startServer(PORT);
startChatClient();
setInterval(deleteOldMessages, minutesToMs(4));
setInterval(deleteExcessMessagesPerChannel, minutesToMs(3));
setInterval(leaveOldChannels, minutesToMs(4));
