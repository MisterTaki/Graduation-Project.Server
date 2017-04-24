import { APIError } from '../helpers';
import { titleCase, successRes } from '../utils';
import { Notice, User } from '../models';

function publish ({ body, user }, res, next) {
  const { _id, identity } = user;
  const { title, content, remark } = body;
  if (identity !== 'admin') {
    return next(new APIError('不是管理员，无法发布', 401));
  }
  return User[titleCase(identity)].getUserById(_id)
    .then(({ username }) => Notice.create({
      title,
      content,
      remark,
      author: username
    }))
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

export default {
  publish
};
