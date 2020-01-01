import express from 'express';
import {allowCORS} from './helpers';
import {logRequest, joinChannel} from './request-handlers';
import {queueRequest} from './request-queue'

export function startServer(port) {
  console.log('Server starting');
  const app = express();
  app.use(allowCORS);
  app.get('/v1/:channel', logRequest, joinChannel, queueRequest);
  app.set('json spaces', 2);
  app.listen(port);
}
