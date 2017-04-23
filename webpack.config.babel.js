import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';

// const buildPath = path.join(__dirname, 'lib');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const sourcPath = path.resolve('src');
const buildPath = path.resolve('lib');

const plugins = [
  new CleanWebpackPlugin([buildPath], {
    root: process.cwd(),
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: isProd,
    debug: !isProd,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(nodeEnv),
  }),
  new webpack.BannerPlugin({
    banner: '#!/usr/bin/env node',
    raw: true,
    include: [
      'norrisbot',
    ],
  }),
];

module.exports = {
  target: 'node',
  devtool: 'cheap-module-source-map',
  entry: {
    norrisbot: path.join(sourcPath, 'norrisbot-cli.js'),
  },
  output: {
    path: buildPath,
    filename: '[name]',
    library: 'norrisbot',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [{ loader: 'json-loader', options: { loaderType: 'preLoader' } }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [{
          loader: 'babel-loader',
          query: 'cacheDirectory=.babel_cache',
        }],
      },
    ],
  },
  plugins,
};
