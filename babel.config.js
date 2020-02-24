module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
  ],
};
