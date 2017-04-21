import moment from 'moment';
import mongoose from '../mongoose';
import { APIError } from '../helpers';

const captchaSchema = mongoose.Schema({
  code: String,
  email_address: String,
  isValidated: {
    type: Boolean,
    default: false
  }
});

captchaSchema.statics = {
  validate (captchaCode, emailAddress) {
    return new Promise((resolve, reject) => {
      this.find({}).sort('-_id').findOne({
        code: captchaCode,
        email_address: emailAddress,
        isValidated: false
      }).exec()
      .then((record) => {
        if (record) {
          if (moment().isBetween(record.created_at, moment(record.created_at).add(30, 'm'))) {
            return resolve(record._id);
          }
          return reject(new APIError('验证码已过期'));
        }
        return reject(new APIError('验证码错误或失效'));
      })
      .catch(err => reject(err));
    });
  },
  serValidatedById (_id) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate({ _id }, { isValidated: true }).exec()
      .then(() => resolve())
      .catch(err => reject(err));
    });
  }
};

export default mongoose.model('captcha', captchaSchema);
