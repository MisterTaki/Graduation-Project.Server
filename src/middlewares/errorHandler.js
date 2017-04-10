export default function (err, req, res, next) { // eslint-disable-line no-unused-vars
  return res.status(err.status).json({
    message: err.message
  });
}
