// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true
  },
  extends: 'airbnb-base',
  'rules': {
    // customs
    "comma-dangle": ["error", "ignore"],
    "func-names": 0,
    "max-len": 0,
    "no-param-reassign": 0,
    "space-before-function-paren": ["error", "always"],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  }
}
