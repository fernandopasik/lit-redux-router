export default {
  collectCoverageFrom: ['src/**/*.{j,t}s'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.all.json', useESM: true } },
  moduleNameMapper: { '(.*)\\.js': '$1' },
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!(@lit|lit|lit-html|lit-element|webcomponents|@open-wc)/).*/',
  ],
};
