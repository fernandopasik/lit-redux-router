import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import { configs as lit } from 'eslint-plugin-lit';
import { configs as wc } from 'eslint-plugin-wc';
import ymlPlugin from 'eslint-plugin-yml';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: ['coverage/', 'docs/', 'demo/dist/', 'lib/', 'lit-redux-router.*'],
  },
  eslint.configs.all,
  importPlugin.flatConfigs.recommended,
  importPlugin.configs.typescript,
  lit['flat/recommended'],
  wc['flat/recommended'],
  ...ymlPlugin.configs['flat/recommended'],
  ...ymlPlugin.configs['flat/prettier'],
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
    settings: { 'import/resolver': { typescript: {} } },
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
    },
  },
  {
    files: ['**/*.test.*'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
    },
  },
  prettier,
);
