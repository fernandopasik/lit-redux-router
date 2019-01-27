module.exports = {
  collectCoverageFrom: ['src/**'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
};
