import { literalsHtmlCssMinifier } from '@literals/rollup-plugin-html-css-minifier';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';

const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
  warn(warning);
};

const isServe = process.env.npm_lifecycle_event === 'start';

export default isServe
  ? {
      input: './demo/app.ts',
      output: {
        dir: 'docs',
        format: 'esm',
        inlineDynamicImports: true,
        sourcemap: true,
      },
      plugins: [
        typescript({
          exclude: ['/lib', '/lit-redux-router.*', '**/*.test.*'],
          tsconfig: 'tsconfig.build.json',
        }),
        resolve(),
        html({
          template: './demo/index.html',
        }),
        serve({ contentBase: 'docs', historyApiFallback: true }),
      ],
    }
  : {
      external: ['lit', 'lit/decorators.js', 'lit/directives/unsafe-html.js', 'pwa-helpers'],
      input: 'lit-redux-router.js',
      onwarn,
      output: {
        file: 'lit-redux-router.min.js',
        format: 'esm',
        sourcemap: true,
      },
      plugins: [
        literalsHtmlCssMinifier(),
        resolve(),
        terser({
          mangle: {
            module: true,
            properties: true,
          },
        }),
      ],
    };
