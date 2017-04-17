import express from 'express';
import parser from 'body-parser';
import logger from 'morgan';

import { mongoose } from './lib/db/mongoose';

const app = express();
const port = process.env.PORT || 8080;

app.use(parser.json());

app.get('/', (req, res) => res.send('echo'));

app.use(logger('dev'));

app.listen(port, console.log(`on port ${port}`));