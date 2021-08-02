/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjVjK
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* @fisker/eslint-config https://git.io/fjOeH */

module.exports = {
  root: true,
  env: {},
  parserOptions: {},
  extends: ['@fisker'],
  settings: {},
  rules: {
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/import-style': 'off',
    'sonarjs/cognitive-complexity': 'off',
  },
  plugins: [],
  globals: {
    Uint8Array: false,
    DataView: false,
  },
  overrides: [],
}
