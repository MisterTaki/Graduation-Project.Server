import fs from 'fs';
import moment from 'moment';
import multer from 'multer';
import { titleCase, successRes } from '../utils';
import { Resource, User } from '../models';

/* eslint no-shadow: 0 */
function upload (req, res, next) {
  const { user } = req;
  const { _id, identity } = user;
  return User[titleCase(identity)].getUserById(_id)
    .then((result) => {
      let teacherID = '';
      if (identity === 'student') {
        teacherID = result.teacher;
      } else {
        teacherID = result._id;
      }
      const folder = `./uploads/groups/${teacherID}`;
      const storage = multer.diskStorage({
        destination (req, file, cb) {
          cb(null, folder);
        }
      });
      try {
        fs.accessSync(folder);
      } catch (e) {
        fs.mkdirSync(folder);
      }
      const uploads = multer({ storage }).any();
      uploads(req, res, (err) => {
        if (err) throw (err);
        const { body } = req;
        const { resourceName, resourceSize } = body;
        const resourcePath = `./uploads/groups/${teacherID}/${moment().format('YYYYMMDDHHmmss')}-${resourceName}`;
        fs.rename(req.files[0].path, resourcePath, (err) => {
          if (err) throw (err);
          return Resource.create({
            uploaderID: _id,
            uploaderIdentity: identity,
            uploaderName: result.username,
            resourcePath,
            resourceName,
            resourceSize,
            group: result.group
          });
        });
      });
    })
    .then(() => res.json({
      ...successRes
    }))
    .catch(next);
}

export default {
  upload,
};
