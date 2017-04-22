import { Academy } from '../models';
import { successRes } from '../utils';

function load (req, res, next) {
  return Academy.find({}, '_id value').exec()
    .then(academys => res.json({
      ...successRes,
      result: academys
    }))
    .catch(next);
}

export default {
  load
};
