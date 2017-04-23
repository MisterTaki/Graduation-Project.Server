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
  const { identity, ...info } = body;
  const { _id } = body;
  const Account = User[titleCase(body.identity)];
  return Account.notUserById(_id)
    .then(() => Crypto.encrypt(body.ID.substring(12)))
    .then(({ salt, pwd }) => Account.create({
      ...info,
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
  const { _id } = body;
  const targetAccount = User[titleCase(identity)];
  const Account = User[`Apply${titleCase(identity)}`];
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

function load ({ user }, res, next) {
  const { _id, identity } = user;
  return User[titleCase(identity)].getUserById(_id)
    .then(({ username, gender, ID, _class, academyID, major, email, mobile }) => res.json({
      ...successRes,
      result: {
        identity,
        username,
        gender,
        ID,
        _id,
        _class,
        academyID,
        major,
        email,
        mobile
      }
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

function modifyPwd ({ body, user }, res, next) {
  const { _id, identity } = user;
  const { oldPwd, newPwd } = body;
  const Account = User[titleCase(identity)];
  return Account.getUserById(_id)
    .then(({ salt, pwd }) => Crypto.decrypt(oldPwd, salt, pwd))
    .then(() => Crypto.encrypt(newPwd))
    .then(({ salt, pwd }) => Account.modifyPwdById(_id, salt, pwd))
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

export default {
  create,
  apply,
  load,
  forgetPwd,
  setPwd,
  modifyPwd
};
