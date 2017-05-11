import fs from 'fs';
import moment from 'moment';
import multer from 'multer';
import { titleCase, successRes } from '../utils';
import { Resource, User } from '../models';

function load ({ user }, res, next) {
  const { _id, identity } = user;
  return User[titleCase(identity)].getUserById(_id)
    .then(({ group }) => Resource.getById(group))
    .then(resources => res.json({
      ...successRes,
      result: {
        resources
      }
    }))
    .catch(next);
}

function download ({ query }, res, next) {
  const { _id } = query;
  return Resource.findById(_id)
    .then(({ resourceName, resourcePath }) => res.download(
      resourcePath,
      resourceName
    ))
    .catch(next);
}

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
        const { resourceSize } = body;
        const resourceName = `${moment().format('YYYYMMDDHHmmss')}-${body.resourceName}`;
        Resource.create({
          uploaderID: _id,
          uploaderIdentity: identity,
          uploaderName: result.username,
          resourcePath: req.files[0].path,
          resourceName,
          resourceSize,
          groupID: result.group
        })
        .then(resource => res.json({
          ...successRes,
          result: {
            resource
          }
        }))
        .catch(next);
      });
    })
    .catch(next);
}

export default {
  load,
  upload,
  download
};
