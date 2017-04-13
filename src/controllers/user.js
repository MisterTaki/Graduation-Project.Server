import { crypto } from '../helpers';
import { titleCase } from '../utils';
import { User } from '../models';

/**
 * 创建
 * @method    {Post}
 * @param     {Object}  body             [用户信息]
 * @property  {String}  params.identity  [用户身份]
 */
function create ({ params, body }, res, next) {
  const Account = User[titleCase(body.identity)];
  crypto.encrypt(body.ID.substring(12))
    .then(({ salt, pwd }) => {
      const user = new Account({
        ...body,
        salt,
        pwd
      });
      return user.save();
    })
    .then(({ account }) => res.json({
      account
    }))
    .catch(next);
}

// function load ({ user }, res, next) {
//
// }

export default {
  create
};
