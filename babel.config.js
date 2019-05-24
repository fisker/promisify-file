module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '6',
        },
        // debug: true,
        exclude: ['transform-typeof-symbol', 'transform-async-to-generator'],
        // useBuiltIns: 'usage',
        modules: false,
      },
    ],
  ],
  plugins: ['babel-plugin-transform-async-to-promises'],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            // debug: true,
            exclude: [
              'transform-typeof-symbol',
              'transform-async-to-generator',
            ],
          },
        ],
      ],
    },
  },
}
