import { APIError } from '../helpers';
import { System } from '../models';
import { successRes } from '../utils';
import system from '../initializeDB/system';

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

function obtain ({ user }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    return System.findById(system._id)
      .then(({ status_startAt }) => res.json({
        ...successRes,
        result: {
          status_startAt
        }
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

function modify ({ user, body }, res, next) {
  const { identity } = user;
  if (identity === 'admin') {
    const { status_startAt } = body;
    return System.findOneAndUpdate({ _id: system._id }, { status_startAt })
      .then(() => res.json({
        ...successRes
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

export default {
  load,
  obtain,
  modify
};
