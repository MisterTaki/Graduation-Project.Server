import { crypto } from '../helpers';
import { User } from '../models';

/**
 * 注册
 * @method    {Post}
 * @param     {Object}  body             [用户信息]
 * @property  {String}  params.identity  [用户身份]
 */
function register ({ params, body }, res, next) {
  let Account;
  switch (params.identity) {
    case 'student':
      Account = User.Student;
      break;
    case 'Teacher':
      Account = User.Teacher;
      break;
    case 'Admin':
      Account = User.Admin;
      break;
    default:
  }
  crypto.encrypt(body.ID.substring(12))
    .then(({ salt, pwd }) => {
      const user = new Account({
        ...body,
        salt,
        pwd
      });
      return user.save();
    })
    .then(() => res.json({
      message: '注册用户成功'
    }))
    .catch(next);
}

export default {
  register
};
