module.exports = {
  plugins: [
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '6'
        }
      }
    ]
  ],
  moduleId: 'PromisifyFile'
}
