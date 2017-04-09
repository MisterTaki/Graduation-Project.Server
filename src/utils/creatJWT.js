import jwt from 'jsonwebtoken';

export default function (name) {
  const token = jwt.sign({
    data: name
  }, 'secretOrPrivateKey', {
    expiresIn: '1h'
  });
  return token;
}
