import { crypto, JWT } from '../helpers';
import { titleCase } from '../utils';
import { User } from '../models';

/**
 * 登录
 * @method    {Post}
 * @property  {String}  body.account          [账号]
 * @property  {String}  body.originalPwd      [密码]
 * @property  {String}  body.identity         [身份]
 */
function login ({ body }, res, next) {
  let userInfo;
  const { account, originalPwd, identity } = body;
  User[titleCase(identity)].get({ account })
    .then(({ salt, pwd, name }) => {
      userInfo = {
        name
      };
      return crypto.decrypt(originalPwd, salt, pwd);
    })
    .then(() => JWT.creat(account, identity))
    .then(token => res.json({
      token,
      userInfo
    }))
    .catch(next);
}

export default {
  login
};
