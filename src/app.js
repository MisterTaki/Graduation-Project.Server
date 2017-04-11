import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares';
import APIRouters from './routes';
import config from './config';

/* eslint no-console: 0 */
mongoose.connect(config.mongodbURI, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
  console.log('INFO: mongoDB connected');
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', APIRouters);
app.use(errorHandler);

export default app;
