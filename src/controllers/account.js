import { APIError } from '../helpers';
import { titleCase, successRes } from '../utils';
import { User } from '../models';

function load ({ user, query }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    const { type } = query;
    return User[titleCase(type)].getAll()
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
  const { identity: accountType, _id: accountID } = body;
  if (identity === 'admin') {
    return User[titleCase(accountType)].findOneAndUpdate({ _id: accountID }, { ...body })
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

export default {
  load,
  modify
};
