import { APIError, Crypto, Email } from '../helpers';
import { titleCase, successRes } from '../utils';
import { User } from '../models';

/**
 * 创建
 * @method    {Post}
 * @param     {Object}  body             [用户信息]
 * @property  {String}  params.identity  [用户身份]
 */
function create ({ body }, res, next) {
  const Account = User[titleCase(body.identity)];
  const { _id } = body;
  Account.notUserById(_id)
    .then(() => Crypto.encrypt(body.ID.substring(12)))
    .then(({ salt, pwd }) => Account.create({
      ...body,
      salt,
      pwd,
    }))
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

function apply ({ body }, res, next) {
  const { identity, ...info } = body;
  const targetAccount = User[titleCase(identity)];
  const Account = User[`Apply${titleCase(identity)}`];
  const { _id } = body;
  targetAccount.notUserById(_id)
    .then(() => Account.notUserById(_id))
    .then(() => Account.create({
      ...info
    }))
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

function forgetPwd ({ body }, res, next) {
  const { identity, boundEmail } = body;
  if (!boundEmail || !identity) {
    return next(new APIError('Missing parameters', 400));
  }
  const Account = User[titleCase(identity)];
  return Account.findByEmail(boundEmail)
    .then(() => Email.resetPwd(boundEmail))
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

export default {
  create,
  apply,
  forgetPwd
};
