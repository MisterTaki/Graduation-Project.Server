import { APIError } from '../helpers';
import { successRes } from '../utils';
import { User } from '../models';

function load ({ user, query }, res, next) {
  const { identity } = user;
  const { type } = query;
  if (identity === 'student' && type === 'option') {
    return User.Teacher.getVolunteerTeachers()
    .then(teachers => res.json({
      ...successRes,
      result: {
        teachers
      }
    }))
    .catch(next);
  }
  return next(new APIError('参数格式错误', 400));
}

export default {
  load
};
