import { APIError, Crypto, Email } from '../helpers';
import { titleCase, successRes } from '../utils';
import { User } from '../models';

function create ({ user, body }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    const { identity: accountType, ...info } = body;
    const Account = User[titleCase(accountType)];
    return Account.notUserById(body._id)
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
  return next(new APIError('身份验证错误', 401));
}

function agree ({ user, body }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    const { _id, email } = body;
    const Account = User.Student;
    return Account.notUserById(_id)
      .then(() => Crypto.encrypt(body.ID.substring(12)))
      .then(({ salt, pwd }) => Account.create({
        ...body,
        salt,
        pwd,
      }))
      .then(() => User.ApplyStudent.remove({ _id }).exec())
      .then(() => Email.applyReply(email, 'success', _id))
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

function refuse ({ user, body }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    const { _id, email } = body;
    return User.ApplyStudent.remove({ _id }).exec()
      .then(() => Email.applyReply(email, 'fail', _id))
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

function remove ({ user, body }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    const { _id, identity: accountType } = body;
    const Account = User[titleCase(accountType)];
    return Account.remove({ _id }).exec()
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

function load ({ user, query }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    const { type } = query;
    let accountType = '';
    if (type === 'apply') {
      accountType = 'ApplyStudent';
    } else {
      accountType = titleCase(type);
    }
    return User[accountType].getAll()
      .then(accounts => res.json({
        ...successRes,
        result: {
          accounts
        }
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

function modify ({ user, body }, res, next) {
  const { identity } = user;
  const { identity: accountType, _id, ...info } = body;
  if (identity === 'admin') {
    return User[titleCase(accountType)].findOneAndUpdate({ _id }, info)
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

export default {
  create,
  agree,
  refuse,
  load,
  modify,
  remove
};
