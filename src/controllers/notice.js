import { APIError } from '../helpers';
import { titleCase, successRes } from '../utils';
import { Notice, User } from '../models';

function publish ({ body, user }, res, next) {
  const { _id, identity } = user;
  if (identity !== 'admin') {
    return next(new APIError('不是管理员，无法发布', 401));
  }
  const { title, content, remark } = body;
  return User[titleCase(identity)].getUserById(_id)
    .then(({ username }) => Notice.create({
      title,
      content,
      remark,
      author: username
    }))
    .then(notice => res.json({
      ...successRes,
      result: {
        notice
      }
    }))
    .catch(next);
}

function load (req, res, next) {
  return Notice.find({}, 'title content remark author created_at').sort('-_id').exec()
    .then(noticeList => res.json({
      ...successRes,
      result: {
        noticeList
      }
    }))
    .catch(next);
}

function remove ({ body, user }, res, next) {
  const { identity } = user;
  if (identity !== 'admin') {
    return next(new APIError('不是管理员，无法删除', 401));
  }
  const { _id } = body;
  return Notice.findByIdAndRemove(_id).exec()
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

export default {
  publish,
  load,
  remove
};
