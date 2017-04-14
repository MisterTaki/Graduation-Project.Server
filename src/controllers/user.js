import { crypto } from '../helpers';
import { titleCase, successRes } from '../utils';
import { User } from '../models';

/**
 * 创建
 * @method    {Post}
 * @param     {Object}  body             [用户信息]
 * @property  {String}  params.identity  [用户身份]
 */
function create ({ params, body }, res, next) {
  const Account = User[titleCase(body.identity)];
  const { _id } = body;
  Account.notUserById(_id)
    .then(() => crypto.encrypt(body.ID.substring(12)))
    .then(({ salt, pwd }) => {
      const user = new Account({
        ...body,
        salt,
        pwd,
      });
      return user.save();
    })
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

// function load ({ user }, res, next) {
//
// }

export default {
  create
};
