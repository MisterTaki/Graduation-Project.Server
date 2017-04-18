import unless from 'express-unless';
import { APIError, JWT } from '../helpers';

/* eslint consistent-return: 0 */
function checkToken (req, res, next) {
  const token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers.authorization; // headers' attribute-name are lower-case;
  if (token) {
    JWT.verify(token)
    .then(({ _id, identity }) => {
      req.user = {
        _id,
        identity
      };
      return next();
    })
    .catch((err) => {
      if (err.name === 'TokenExpiredError') {
        return next(new APIError('登录信息已过期，请重新登录', 401));
      }
      return next(new APIError('登录信息已无效，请重新登录', 401));
    });
  } else {
    return next(new APIError('没有登录信息，请重新登录', 401));
  }
}

checkToken.unless = unless;

export default checkToken;
