const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
  },
  plugins: [
    'eslint-plugin-tsdoc',
  ],
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest/all',
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    eqeqeq: ['error', 'always'],
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    strict: ['error', 'safe'],
    yoda: ['error', 'never', { exceptRange: true }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'tsdoc/syntax': 'warn',
  },
};
