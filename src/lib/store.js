import sqlite3 from 'sqlite3';
import {daysToMs} from './helpers';

let db;
let counter = 0;

setInterval(() => {
  console.log('New messsages: ' + counter);
  counter = 0;
}, 30000);

async function createTables() {
  db.run('CREATE TABLE IF NOT EXISTS lines (at INTEGER, channel TEXT, line TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS requests (channel TEXT UNIQUE, at INTEGER)');
  db.run('CREATE INDEX IF NOT EXISTS at_index ON lines (at)');
}

export function connectToDatabase(host) {
  db = new sqlite3.Database(host);
  createTables();
}

export async function saveMessage(channel, user, message) {
  counter++;
  if (channel.charAt(0) === '#') channel = channel.substring(1);

  const data = {channel, user, message, at: Date.now()};
  const statement = 'INSERT INTO lines VALUES(?, ?, ?)';
  const values = [data.at, channel, JSON.stringify(data)];
  db.run(statement, values);
}

export async function getMessagesJson(channel, after, before, limit) {
  const statement = 'SELECT * FROM lines WHERE ' +
    'channel = ? AND at > ? AND at < ? ' +
    'ORDER BY at DESC LIMIT ?';
  const values = [channel, after, before, limit];
  return new Promise((resolve, reject) => {
    db.all(statement, values, (e, results) => {
      if (e) reject(e);
      else {
        const lines = results.map(r => r.line).reverse();
        resolve('['+lines.join(',')+']');
      }
    });
  });
}

export function saveChannelRequest(channel) {
  const st = 'INSERT OR REPLACE INTO requests VALUES(?, ?)';
  const values = [channel, Date.now()];
  db.run(st, values);
}

export async function requestedRecently() {
  const st = 'SELECT channel FROM requests WHERE at > ?';
  const values = [Date.now() - daysToMs(2)];
  return new Promise((resolve, reject) => {
    db.all(st, values, (e, results) => {
      if (e) reject(e);
      else resolve(results.map(r => r.channel));
    });
  });
}

export async function deleteOldMessages() {
  const twoDaysAgo = Date.now() - daysToMs(2);
  const statement = 'DELETE FROM lines WHERE at < ?';
  db.run(statement, [twoDaysAgo]);
}