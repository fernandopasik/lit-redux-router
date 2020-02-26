module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  transform: { '^.+\\.[j|t]s$': 'ts-jest' },
};
