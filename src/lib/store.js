import {MongoClient} from 'mongodb';

const host = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/tb';
const db = MongoClient.connect(host);

export async function saveMessage(msgObject) {
  return messages().insertOne(Object.assign(msgObject, {at: Date.now()}));
}

export async function getMessages(channel, startTime, endTime, limit) {
  const query = {channel, at: {$gt: startTime, $lt: endTime}};
  const c = messages().find(query).sort({at: -1}).limit(limit).sort({at: 1});
  return c.toArray();
}

async function messages() {
  return (await db).collection('messages');
}