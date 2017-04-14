import { APIError } from '../helpers';

export default function (err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err instanceof APIError) {
    const { status, state, message } = err;
    const response = {
      status,
      state,
      message
    };
    if (status === 200) {
      return res.json(response);
    }
    return res.status(status).json(response);
  }
  console.error(`ERROR: ${err}`); // eslint-disable-line no-console
  return res.status(500).json({
    status: 500,
    state: 'Fail',
    message: '服务器开小差了'
  });
}
