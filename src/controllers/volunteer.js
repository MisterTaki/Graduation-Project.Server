// import { APIError } from '../helpers';
import { successRes } from '../utils';
import { User } from '../models';

function load ({ user }, res, next) {
  const { _id, identity } = user;
  let getMethod;
  switch (identity) {
    case 'student':
      getMethod = User.Teacher.getVolunteerTeachers.bind(User.Teacher);
      break;
    default:

  }
  return getMethod(_id)
    .then(teahcers => res.json({
      ...successRes,
      result: {
        teahcers
      }
    }))
    .catch(next);
}

export default {
  load
};
