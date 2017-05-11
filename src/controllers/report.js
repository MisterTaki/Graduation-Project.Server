import fs from 'fs';
import moment from 'moment';
import multer from 'multer';
import { APIError } from '../helpers';
import { successRes } from '../utils';
import { Report, User } from '../models';

function load ({ user }, res, next) {
  const { _id, identity } = user;
  if (identity === 'teacher') {
    return Report.getByTeacherId(_id)
      .then(reports => res.json({
        ...successRes,
        result: {
          reports
        }
      }))
      .catch(next);
  } else if (identity === 'student') {
    return Report.getByStudentId(_id)
      .then(reports => res.json({
        ...successRes,
        result: {
          reports
        }
      }))
      .catch(next);
  }
  return next(new APIError('身份验证错误', 401));
}

function download ({ query }, res, next) {
  const { _id } = query;
  return Report.findById(_id)
    .then(({ reportName, reportPath }) => res.download(
      reportPath,
      reportName
    ))
    .catch(next);
}

/* eslint no-shadow: 0 */
function upload (req, res, next) {
  const { user } = req;
  const { _id, identity } = user;
  if (identity !== 'student') return next(new APIError('身份验证错误', 401));
  return User.Student.getUserById(_id)
    .then((result) => {
      const folder = `./uploads/reports/${_id}`;
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
        const { reportSize } = body;
        const reportName = `${moment().format('YYYYMMDDHHmmss')}-${body.reportName}`;
        Report.create({
          student: _id,
          reportPath: req.files[0].path,
          reportName,
          reportSize,
          teacher: result.teacher
        })
        .then(report => res.json({
          ...successRes,
          result: {
            report
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
