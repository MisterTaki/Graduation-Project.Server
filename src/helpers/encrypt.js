import crypto from 'crypto';
import APIError from './APIError';

export default pwd => new Promise((resolve, reject) => {
  crypto.randomBytes(128, (err, salt) => {
    if (err) {
      reject(new APIError('密码加密失败', 403));
    }
    crypto.pbkdf2(pwd, salt.toString('hex'), 4096, 256, (error, hash) => {
      if (error) {
        reject(new APIError('密码加密失败', 403));
      }
      resolve({
        salt: salt.toString('hex'),
        hash: hash.toString('hex')
      });
    });
  });
});
