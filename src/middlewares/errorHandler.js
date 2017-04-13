export default function (err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err.status) {
    return res.status(err.status).json({
      message: err.message
    });
  }
  console.error(`ERROR: ${err}`); // eslint-disable-line no-console
  return res.status(500).json({
    message: '服务器开小差了',
    err
  });
}
