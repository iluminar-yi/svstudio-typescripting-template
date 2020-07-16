/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const main = ['./framework/index.ts'];
const projectName = require('./package.json').name;

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  entry: {
    main,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${projectName}.js`,
    publicPath: '/',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
    }),
    new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
  ],
  module: {
    rules: [
      {
        test: /.ts$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'inline-source-map',
};
