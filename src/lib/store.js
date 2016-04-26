import {MongoClient} from 'mongodb';
import {daysToMs} from './helpers';

const host = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/tb';
let db = Promise.reject('Database not yet connected');
let counter = 0;

setInterval(() => {
  console.log('New messsages: ' + counter);
  counter = 0;
}, 30000);
createIndex();

async function createIndex() {
  (await requests()).createIndex({channel: 1}, {unique: true});
}

async function messages() {
  return (await db).collection('messages');
}

async function requests() {
  return (await db).collection('requests');
}

export function connectToDatabase(host) {
  db = MongoClient.connect(host);
}

export async function saveMessage(msgObject) {
  counter++;
  const collection = await messages();
  return collection.insertOne(Object.assign(msgObject, {at: Date.now()}));
}

export async function getMessages(channel, startTime, endTime, limit) {
  const coll = await messages();
  const query = {channel, at: {$gt: startTime, $lt: endTime}};
  const c = await coll.find(query).sort({at: -1}).limit(limit).sort({at: 1});
  return c.toArray();
}

export async function saveChannelRequest(channel) {
  return (await requests()).updateOne(
    {channel},
    {channel, at: Date.now()},
    {upsert: true}
  )
}

export async function requestedRecently() {
  const query = {at: {$gt: Date.now() - daysToMs(2)}};
  const arrayPromise = await (await requests()).find(query).toArray();
  return (await arrayPromise).map((c) => c.channel);
}

export async function deleteOldMessages() {
  const twoDaysAgo = Date.now() - daysToMs(2);
  const coll = await messages();
  const arr = await coll.deleteMany({at: {$lt: twoDaysAgo}}).toArray();
  return arr.length? arr[0].at : false;
}