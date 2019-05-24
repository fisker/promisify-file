/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjJKA
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* @fisker/eslint-config https://git.io/fjOeH */

module.exports = {
  root: true,
  env: {},
  parserOptions: {},
  extends: ['@fisker'],
  settings: {},
  rules: {},
  plugins: [],
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      env: {
        jest: true,
      },
      globals: {
        window: true,
      },
    },
  ],
  globals: {
    Uint8Array: false,
    DataView: false,
  },
}
