import { APIError } from '../helpers';
import { System } from '../models';
import { successRes } from '../utils';

function load (req, res, next) {
  System.getStatus()
    .then(status => res.json({
      ...successRes,
      result: {
        status
      }
    }))
    .catch(next);
}

function modify ({ user, body }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    const { _id, ...info } = body;
    return System.findOneAndUpdate({ _id }, { ...info })
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
