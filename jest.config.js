module.exports = {
  collectCoverageFrom: ['src/**'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(js|ts)?(x)', '**/?(*.)+(spec|test).(js|ts)?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
};
