import jwt from 'jsonwebtoken';
import config from '../config';
import { APIError } from '../helpers';

export default function (req, res, next) {
  const token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers.Authorization;
  if (token) {
    jwt.verify(token, config.jwt.secret, (err, { account, identity }) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return next(new APIError('认证信息已过期，请重新登录', 401));
        }
        return next(new APIError('认证信息无效，请重新登录', 401));
      }
      req.user = {
        account,
        identity
      };
      return next();
    });
  }
  return next(new APIError('没有认证信息，请重新登录', 401));
}
