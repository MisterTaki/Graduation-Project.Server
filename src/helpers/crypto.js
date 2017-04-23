import crypto from 'crypto';
import { APIError } from '../helpers';

function encrypt (originalPwd) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(8, (err, salt) => {
      if (err) reject(err);
      const saltHex = salt.toString('hex');
      crypto.pbkdf2(originalPwd, saltHex, 1024, 8, 'sha1', (error, pwd) => {
        if (error) reject(error);
        resolve({
          salt: saltHex,
          pwd: pwd.toString('hex')
        });
      });
    });
  });
}

function decrypt (originalPwd, salt, pwd) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(originalPwd, salt, 1024, 8, 'sha1', (err, hash) => {
      if (err) reject(err);
      if (hash.toString('hex') === pwd) resolve();
      reject(new APIError('密码错误'));
    });
  });
}

export default {
  encrypt,
  decrypt
};
