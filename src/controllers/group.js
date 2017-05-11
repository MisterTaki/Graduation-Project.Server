import { APIError } from '../helpers';
import { successRes } from '../utils';
import { Group, User } from '../models';

function load ({ user }, res, next) {
  const { _id, identity } = user;
  if (identity === 'teacher') {
    return User.Teacher.getUserById(_id)
    .then(({ group }) => Group.getStudentsById(group))
      .then(receiverOptions => res.json({
        ...successRes,
        result: {
          receiverOptions
        }
      }))
      .catch(next);
  } else if (identity === 'student') {
    return User.Student.getUserById(_id)
      .then(({ group }) => Group.getMembersById(group, _id))
      .then(receiverOptions => res.json({
        ...successRes,
        result: {
          receiverOptions
        }
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

export default {
  load
};
