import jwt from 'jsonwebtoken';
import { JWT } from '../config';

function create (_id, username, identity) {
  return new Promise((resolve, reject) => {
    jwt.sign({ _id, username, identity }, JWT.secret, { expiresIn: JWT.expiresIn }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

function verify (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT.secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}

export default {
  create,
  verify
};
