import { APIError, Crypto, Email } from '../helpers';
import { titleCase, successRes } from '../utils';
import { User, Captcha } from '../models';

/**
 * 创建
 * @method    {Post}
 * @param     {Object}  body             [用户信息]
 * @property  {String}  params.identity  [用户身份]
 */
function create ({ body }, res, next) {
  const Account = User[titleCase(body.identity)];
  const { _id } = body;
  return Account.notUserById(_id)
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
  return targetAccount.notUserById(_id)
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
  return Account.hasUserByEmail(boundEmail)
    .then(() => Email.resetPwd(boundEmail))
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

function setPwd ({ body }, res, next) {
  const { identity, boundEmail, captcha, newPwd } = body;
  if (!identity || !boundEmail || !captcha || !newPwd) {
    return next(new APIError('Missing parameters', 400));
  }
  let captchaId;
  const Account = User[titleCase(identity)];
  return Captcha.validate(captcha, boundEmail)
    .then((id) => {
      captchaId = id;
      return Crypto.encrypt(newPwd);
    })
    .then(({ salt, pwd }) => Account.setPwdByEmail(boundEmail, salt, pwd))
    .then(() => Captcha.serValidatedById(captchaId))
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

export default {
  create,
  apply,
  forgetPwd,
  setPwd
};
