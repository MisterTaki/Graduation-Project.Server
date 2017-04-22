import moment from 'moment';
import mongoose from '../mongoose';
import { APIError } from '../helpers';
import { system } from '../initializeDB';

const systemSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  enabled: {
    type: Boolean,
    required: true
  },
  status_startAt: [String]
});

systemSchema.statics = {
  getStatus () {
    return new Promise((resolve, reject) => {
      this.findById(system._id).exec()
        .then((settings) => {
          if (settings) {
            if (!system.enabled) {
              return reject(new APIError('系统暂未开放'));
            }
            const startTimes = settings.status_startAt;
            const timesLen = startTimes.length;
            if (moment().isBefore(startTimes[0])) {
              return resolve(0);
            }
            for (let i = 0; i < timesLen - 1; i += 1) {
              if (moment().isBetween(startTimes[i], startTimes[i + 1])) {
                return resolve(i + 1);
              }
            }
            if (moment().isAfter(startTimes[timesLen - 1])) {
              return resolve(-1);
            }
          }
          return reject(new APIError('系统暂未设置', 500));
        })
        .catch(err => reject(err));
    });
  }
};

export default mongoose.model('system', systemSchema);
