import express from 'express';
import parser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import { mongoose } from './lib/db/mongoose';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

const app = express();
const port = process.env.PORT || 8080;

app.use(parser.json());
app.use(cors());

app.get('/', (req, res) => res.send('echo'));
app.use('/users', authRoutes);
app.use('/products', productRoutes);
app.use('/', orderRoutes);

app.use(logger('dev'));

app.listen(port, console.log(`on port ${port}`));
