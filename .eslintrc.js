module.exports = {
  ignorePatterns: [],
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.eslint.json'], // Specify it only for TypeScript files
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'always'],
    'no-trailing-spaces': 0,
    'keyword-spacing': 0,
    'no-unused-vars': 0,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 0,
    'eol-last': 0,
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'], // Your TypeScript files extension
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
      rules: {
        'import/prefer-default-export': 'off',
        'new-cap': 'off',
      },
    },
  ],
};
