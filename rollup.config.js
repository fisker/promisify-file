import babel from 'rollup-plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import rollupPrettier from 'rollup-plugin-prettier'
import {terser} from 'rollup-plugin-terser'
import prettier from 'prettier'

const libraryName = 'PromisifyFile'
const prettierConfig = prettier.resolveConfig.sync(`src/index.js`)

const plugins = [nodeResolve(), babel(), rollupPrettier(prettierConfig)]
const minify = [nodeResolve(), babel(), terser()]

const builds = {
  input: 'src/index.js',
  output: [
    // umd build
    {
      file: 'lib/index.js',
      format: 'umd',
      name: libraryName,
      sourcemap: true,
    },
    // esm build
    {
      file: 'lib/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins,
}

const minifiedBuilds = {
  ...builds,
  output: builds.output.map((config) => ({
    ...config,
    file: config.file.replace(/(\.m?js)$/, '.min$1'),
  })),
  plugins: minify,
}

export default [builds, minifiedBuilds]
