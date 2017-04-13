export default {
  jwt: {
    secret: new Buffer('PrivateKey', 'base64'),
    expiresIn: '1h'
  },
  mongodbURI: 'mongodb://localhost:27017/Graduation-Project'
};
