import { System } from '../models';
import { successRes } from '../utils';

function getStatus (req, res, next) {
  System.getStatus()
    .then(status => res.json({
      ...successRes,
      result: {
        status
      }
    }))
    .catch(next);
}

export default {
  getStatus
};
