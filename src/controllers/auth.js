import { Crypto, JWT } from '../helpers';
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
  return User[titleCase(identity)].getUserById(_id)
    .then(({ salt, pwd, username }) => {
      userInfo = {
        username,
        identity
      };
      return Crypto.decrypt(originalPwd, salt, pwd);
    })
    .then(() => JWT.create(_id, userInfo.username, identity))
    .then(token => res.json({
      ...successRes,
      result: {
        token,
        userInfo
      }
    }))
    .catch(next);
}

function load ({ user }, res, next) {
  const { _id, identity } = user;
  return User[titleCase(identity)].getUserById(_id)
    .then(({ username }) => res.json({
      ...successRes,
      result: {
        username,
        identity
      }
    }))
    .catch(next);
}

export default {
  login,
  load
};
