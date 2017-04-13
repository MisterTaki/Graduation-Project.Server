import jwt from 'jsonwebtoken';
import config from '../config';

function creat (account, identity) {
  return new Promise((resolve, reject) => {
    jwt.sign({ account, identity }, config.jwt.secret, { expiresIn: config.jwt.expiresIn }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

function verify (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}

export default {
  creat,
  verify
};
