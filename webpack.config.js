require('dotenv').config();
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/**@type {import ('webpack').Configuration} */
module.exports = {
  // target: 'electron-renderer',
  entry: './src/index.tsx',
  cache: true,
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    compress: true,
    port: 4200,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.EnvironmentPlugin(['WEB_EX_API_URI', 'BOT_TOKEN', 'MY_TOKEN', 'API_KEY']),
  ],
  node: {
    fs: 'empty',
  },
};
