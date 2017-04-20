import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import APIRouters from './routes';
import { checkToken, errorHandler } from './middlewares';
import { mongoDB, version, publicPath } from './config';
import { initializeSystem } from './utils';

/* eslint no-console: 0 */
mongoose.connect(mongoDB.URI, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
  console.log('INFO: 数据库连接成功');
  initializeSystem().then((info) => {
    console.log(`INFO: ${info}`);
  }).catch((error) => {
    console.log(`ERROR: ${error}`);
  });
});

const { URIprefix } = version;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(checkToken.unless({ path: publicPath }));
app.use(URIprefix, APIRouters);
app.use(errorHandler);

export default app;
