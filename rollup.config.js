import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

export default {
  input: `src/logpump-cli/index.js`,
  output: [
    {
      file: `dist/${pkg.main}`,
      format: `iife`,
    },
  ],
  plugins: [
    copy({
      targets: [{ src: './bin/logpump', dest: 'dist' }],
    }),
  ],
};
