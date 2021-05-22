export default {
  collectCoverageFrom: ['src/**/*.{j,t}s'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.all.json' } },
  moduleNameMapper: { '(.*)\\.js': '$1' },
  testEnvironment: 'jsdom',
  transform: { '^.+\\.[j|t]s$': 'ts-jest' },
  transformIgnorePatterns: [
    '/node_modules/(?!(@lit|lit|lit-html|lit-element|webcomponents|@open-wc)/).*/',
  ],
};
