export default {
  collectCoverageFrom: ['src/**/*.ts'],
  globals: { 'ts-jest': { tsConfig: 'tsconfig.all.json' } },
  transform: { '^.+\\.[j|t]s$': 'ts-jest' },
  transformIgnorePatterns: ['/node_modules/(?!(lit-html|lit-element|webcomponents)/).*/'],
};
