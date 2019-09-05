module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'prefer-promise-reject-errors': 'off',
    ignoreTrailingComments: true,
    'max-len': ['error', { code: 380 }],
    'import/extensions': ['error', 'never'],
    'consistent-return': 'off',
    'no-restricted-globals': 'off',
    'no-param-reassign': 'off',
    'no-new': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement']
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};
