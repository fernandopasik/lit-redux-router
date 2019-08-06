/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo/app.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.m?(t|j)sx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/',
  },
  devServer: {
    stats: 'errors-only',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
    }),
  ],
};
