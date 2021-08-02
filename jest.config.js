module.exports = {
  // collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  verbose: true,
  // testRegex: ['__tests__/*.js'],
  testPathIgnorePatterns: ['/shared/', '.eslintrc.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {resources: 'usable'},
}
