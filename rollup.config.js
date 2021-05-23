/* eslint-disable @typescript-eslint/typedef, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import html from 'rollup-plugin-html2';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
  warn(warning);
};

const isServe = process.env.npm_lifecycle_event === 'start';

export default isServe
  ? {
      inlineDynamicImports: true,
      input: './demo/app.ts',
      output: {
        dir: 'docs',
        format: 'esm',
        sourcemap: true,
      },
      plugins: [
        typescript({
          tsconfig: 'tsconfig.all.json',
          exclude: [
            '/lib',
            '/lit-redux-router.*',
            '**/__mocks__/**',
            '**/__tests__/**',
            '**/*.spec.*',
          ],
        }),
        resolve(),
        html({
          template: './demo/index.html',
        }),
        serve({ contentBase: 'docs', historyApiFallback: true }),
      ],
    }
  : {
      input: 'lit-redux-router.js',
      output: {
        file: 'lit-redux-router.min.js',
        format: 'esm',
        sourcemap: true,
      },
      external: ['lit-element', 'lit-html', 'lit-html/directives/unsafe-html.js', 'pwa-helpers'],
      onwarn,
      plugins: [
        minifyHTML(),
        resolve(),
        terser({
          warnings: true,
          mangle: {
            module: true,
            properties: true,
          },
        }),
      ],
    };
