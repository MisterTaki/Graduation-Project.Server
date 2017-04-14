import { System } from '../models';
import { successRes } from '../utils';

function load (req, res, next) {
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
  load
};
