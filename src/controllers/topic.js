import { APIError } from '../helpers';
import { successRes } from '../utils';
import { User } from '../models';

function add ({ body, user }, res, next) {
  const { _id, identity } = user;
  if (identity !== 'teacher') {
    return next(new APIError('不是导师，无法添加', 401));
  }
  const { topics } = body;
  return User.Teacher.addTopicById(_id, topics)
    .then(topicsList => res.json({
      ...successRes,
      result: {
        topics: topicsList
      }
    }))
    .catch(next);
}

function load ({ user }, res, next) {
  const { _id } = user;
  return User.Teacher.getUserById(_id)
    .then(({ topics }) => res.json({
      ...successRes,
      result: {
        topics
      }
    }))
    .catch(next);
}

export default {
  add,
  load
};
