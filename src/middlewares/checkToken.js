import jwt from 'jsonwebtoken';
import unless from 'express-unless';
import { JWT } from '../config';
import { APIError } from '../helpers';

/* eslint consistent-return: 0 */
function checkToken (req, res, next) {
  const token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers.Authorization;
  if (token) {
    jwt.verify(token, JWT.secret, (err, { _id, identity }) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return next(new APIError('登录信息已过期，请重新登录', 401));
        }
        return next(new APIError('登录信息已无效，请重新登录', 401));
      }
      req.user = {
        _id,
        identity
      };
      return next();
    });
  } else {
    return next(new APIError('没有登录信息，请重新登录', 401));
  }
}

checkToken.unless = unless;

export default checkToken;
