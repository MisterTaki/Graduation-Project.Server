import jwt from 'jsonwebtoken';
import config from '../config';
import { APIError } from '../helpers';

const user = {
  account: '41355025',
  pwd: '123456',
  identity: 'student'
};

/**
 * 登录
 * @method    {Post}
 * @property  {String}  body.account  [账号]
 * @property  {String}  body.pwd      [密码]
 * @return    {Object}
 */
function login ({ body }, res, next) {
  const { account, pwd, identity } = body;
  if (account === user.account && pwd === user.pwd && identity === user.identity) {
    const token = jwt.sign({
      account,
      identity
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
