import jwt from 'jsonwebtoken';
import config from '../config';
import { APIError } from '../helpers';

const user = {
  account: '41355025',
  pwd: '123456'
};

function login (req, res, next) {
  const account = req.body.account;
  const pwd = req.body.pwd;
  if (account === user.account && pwd === user.pwd) {
    const token = jwt.sign({
      account
    }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
    return res.json({
      account,
      token
    });
  }
  return next(new APIError('用户名或密码错误', 401));
}

export default {
  login
};
