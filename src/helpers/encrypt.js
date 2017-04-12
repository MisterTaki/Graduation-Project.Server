import crypto from 'crypto';

export default originalPwd => new Promise((resolve, reject) => {
  crypto.randomBytes(8, (err, salt) => {
    if (err) reject(err);
    const saltHex = salt.toString('hex');
    crypto.pbkdf2(originalPwd, saltHex, 1024, 8, 'sha1', (error, pwd) => {
      if (err) reject(err);
      resolve({
        salt: saltHex,
        pwd: pwd.toString('hex')
      });
    });
  });
});
