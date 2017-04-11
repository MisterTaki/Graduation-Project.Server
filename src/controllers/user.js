import { APIError, encrypt } from '../helpers';

function creat ({ body }, res, next) {
  const account = body.account;
  encrypt(body.pwd)
    .then((salt, hash) => {

    })
    .catch(next);
}

// function forget ({ body }, res, next) {
//   const account = body.account;
// }

export default {
  creat
};
