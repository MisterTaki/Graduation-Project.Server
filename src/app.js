import path from 'path';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { creatJWT } from './utils';

const app = express();
const router = express.Router();

router.post('/auth/login', (req, res) => {
  res.json({
    data: {
      token: creatJWT('gaoqi')
    }
  });
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', router);

export default app;
