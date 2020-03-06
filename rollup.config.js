import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'lit-redux-router.js',
  output: {
    file: 'lit-redux-router.min.js',
    format: 'esm',
    sourcemap: true,
  },
  external: ['lit-element', 'lit-html', 'lit-html/directives/unsafe-html', 'pwa-helpers'],
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    warn(warning);
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
