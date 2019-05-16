import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'dist/lit-redux-router.js',
  output: {
    file: 'bundle.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.error(`(!) ${warning.message}`); // eslint-disable-line no-console
    }
  },
  plugins: [
    resolve({
      only: ['regexparam'],
    }),
    terser({
      warnings: true,
      mangle: {
        module: true,
        properties: true,
      },
    }),
  ],
};
