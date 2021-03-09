export default {
  collectCoverageFrom: ['src/**/*.{j,t}s'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.all.json' } },
  transform: { '^.+\\.[j|t]s$': 'ts-jest' },
  transformIgnorePatterns: ['/node_modules/(?!(lit-html|lit-element|webcomponents|@open-wc)/).*/'],
  moduleNameMapper: { '(.*)\\.js': '$1' },
};
