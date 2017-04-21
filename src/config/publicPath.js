import version from './version';

const { URIprefix } = version;

export default [
  `${URIprefix}/auth/login`,
  `${URIprefix}/user/apply`,
  `${URIprefix}/user/forget-pwd`,
  `${URIprefix}/user/set-pwd`
];
