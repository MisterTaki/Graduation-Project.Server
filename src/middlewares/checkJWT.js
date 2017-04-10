import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['access-token'];
  if (token) {
    jwt.verify(token, 'shhhhh', function(err, decoded) {
      if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
      }
      return next();
    });
  }
  return next(new UnauthorizedError('没有认证信息，请重新登录'));
}
