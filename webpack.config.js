const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const postCssConfig = require('./postcss.config');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
          'sass'
        ],
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  eslint: {
    failOnWarning: false,
    failOnError: false,
  },
  plugins: [
    new Dotenv({
      path: './.env', // if not simply .env
      safe: true // lets load the .env.example file as well
    })
  ],
  postcss: postCssConfig(webpack),
};
