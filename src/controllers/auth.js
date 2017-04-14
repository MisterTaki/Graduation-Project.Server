import { crypto, JWT } from '../helpers';
import { titleCase, successRes } from '../utils';
import { User } from '../models';

/**
 * 登录
 * @method    {Post}
 * @property  {String}  body._id              [账号]
 * @property  {String}  body.originalPwd      [密码]
 * @property  {String}  body.identity         [身份]
 */
function login ({ body }, res, next) {
  let userInfo;
  const { _id, originalPwd, identity } = body;
  User[titleCase(identity)].getById(_id)
    .then(({ salt, pwd, name }) => {
      userInfo = {
        name,
        identity
      };
      return crypto.decrypt(originalPwd, salt, pwd);
    })
    .then(() => JWT.creat(_id, identity))
    .then(token => res.json({
      ...successRes,
      result: {
        token,
        userInfo
      }
    }))
    .catch(next);
}

export default {
  login
};
