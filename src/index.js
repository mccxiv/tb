import {startServer} from './lib/server';
import {connectToDatabase} from './lib/store';
import {startChatClient} from './lib/chat';
import {deleteOldMessages} from './lib/store';
import {leaveOldChannels, minutesToMs} from './lib/helpers';

const PORT = 6255;
const DB = 'mongodb://localhost:27017/tb';

connectToDatabase(DB);
startServer(PORT);
startChatClient();
setInterval(deleteOldMessages, minutesToMs(4));
setInterval(leaveOldChannels, minutesToMs(4));