module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true, // 全局严格模式
    },
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'es5' }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
  },
};
