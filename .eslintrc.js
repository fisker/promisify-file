module.exports = {
    root: true,
    parser: require.resolve('babel-eslint'),
    env: {
      es6: true,
      node: true,
      browser: true
    },
    extends: [
      'airbnb-base/legacy',
      'prettier'
    ],
    rules: {
      // allow unused vars
      'no-unused-vars': 1,
      // allow vars not on top
      'vars-on-top': 1,
      // allow function use before define
      'no-use-before-define': 1,
      // allow param reassign
      'no-param-reassign': 1,
      // allow function returns no value
      'consistent-return': 1,
      // allow empty catch
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true
        }
      ],
      // allow plusplus in loop
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true
        }
      ]
    }
  }