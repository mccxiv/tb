import express from 'express';
import chat from './lib/chat';
import store from './lib/store';
import {sleep} from './lib/util';

const app = express();

app.get('/:channel', (req, res) => {

});