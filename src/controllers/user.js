import { encrypt } from '../helpers';
import { User } from '../models';

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
  encrypt(body.ID.substring(12))
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
