import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createNodeResolver, flatConfigs as importConfigs } from 'eslint-plugin-import-x';
import { configs as lit } from 'eslint-plugin-lit';
import { configs as wc } from 'eslint-plugin-wc';
import { configs as ymlConfigs } from 'eslint-plugin-yml';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['coverage/', 'docs/', 'demo/dist/', 'lib/', 'lit-redux-router.*'],
  },
  eslint.configs.all,
  importConfigs.recommended,
  importConfigs.typescript,
  lit['flat/recommended'],
  wc['flat/recommended'],
  {
    extends: [ymlConfigs['flat/standard'], ymlConfigs['flat/prettier']],
    files: ['*.yaml', '*.yml'],
  },
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.node },
      parserOptions: { project: 'tsconfig.json' },
      sourceType: 'module',
    },
    rules: {
      'import/no-unresolved': 'off',
      'max-lines': ['error', { max: 133, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', { max: 30, skipBlankLines: true, skipComments: true }],
      'max-statements': ['error', { max: 35 }],
      'no-ternary': 'off',
      'one-var': 'off',
      'sort-imports': 'off',
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver(), createNodeResolver()],
    },
  },
  {
    // eslint-disable-next-line import/no-named-as-default-member
    extends: [...ts.configs.all],
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/class-methods-use-this': 'off',
      // eslint-disable-next-line no-magic-numbers
      '@typescript-eslint/no-magic-numbers': ['error', { ignore: [0, 1, 2] }],
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/strict-void-return': 'off',
    },
  },
  {
    files: ['**/*.test.*'],
    rules: { '@typescript-eslint/no-floating-promises': 'off' },
  },
  {
    files: ['**/*.test.*', '*.config.@(js|ts)'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'no-magic-numbers': 'off',
      'no-undefined': 'off',
    },
  },
  {
    extends: [tsConfigs.disableTypeChecked],
    files: ['*.config.js'],
  },
  prettier,
]);
