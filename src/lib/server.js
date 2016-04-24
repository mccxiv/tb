import express from 'express';
import {logRequest, joinChannel, respond} from './request-handlers';

export function startServer() {
  console.log('Server starting');
  const app = express();
  app.get('/:channel', logRequest, joinChannel, respond);
  app.listen(process.env.PORT || 80);
}
