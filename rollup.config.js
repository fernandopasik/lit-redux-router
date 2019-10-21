import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'dist/lit-redux-router.js',
  output: {
    file: 'dist/lit-redux-router.min.js',
    format: 'esm',
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  onwarn(warning) {
    const ignored =
      warning.code === 'THIS_IS_UNDEFINED' ||
      (warning.code === 'UNRESOLVED_IMPORT' &&
        (warning.source === 'lit-html/directives/unsafe-html' ||
          warning.source === 'lit-element' ||
          warning.source === 'pwa-helpers'));

    if (!ignored) {
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
