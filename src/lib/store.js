import {MongoClient} from 'mongodb';
import {daysToMs} from './helpers';

let db = Promise.reject('Database not yet connected');
let counter = 0;
const options = {server: {reconnectTries: Infinity}};

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

export async function connectToDatabase(host) {
  db = MongoClient.connect(host, options);
  try {await db}
  catch(e) {
    console.warn('Could not connect to database.');
    setTimeout(() => connectToDatabase(host), 5000);
  }
}

export async function saveMessage(channel, user, message) {
  counter++;
  if (channel.charAt(0) === '#') channel = channel.substring(1);
  const collection = await messages();
  const withTimestamp = {channel, user, message, at: Date.now()};
  return collection.insertOne(withTimestamp);
}

export async function getMessages(channel, after, before, limit) {
  console.log('after:', after);
  console.log('before:', before);
  console.log('limit:', limit);
  const coll = await messages();
  const query = {channel, at: {$gt: after, $lt: before}};
  const fields = {_id: false, channel: false};
  const c = coll.find(query, fields).sort({_id: -1}).limit(limit);
  const arr = await c.toArray();
  return arr.reverse(); 
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