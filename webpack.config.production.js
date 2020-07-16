/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const projectName = require('./package.json').name;

const main = ['./framework/index.ts'];

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  entry: {
    main,
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: `${projectName}.js`,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096,
    }),
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
};
