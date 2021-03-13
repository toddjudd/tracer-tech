module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'allways'],
    'quote-props': ['error', 'never'],
  },
};
