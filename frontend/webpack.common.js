const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

new webpack.EnvironmentPlugin({
  NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
  DEBUG: false,
});

module.exports = {
  context: __dirname,
  // webpack will take the files from ./src/index
  entry: './src/index',
  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: path.resolve(__dirname, '/node_modules'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebPackPlugin({
      template: './static/index.html',
      filename: './index.html',
    }),
    new CspHtmlWebpackPlugin(
      {
        'base-uri': "'self'",
        'object-src': "'none'",
        'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
        'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
      },
      {
        enabled: true,
        hashingMethod: 'sha256',
        hashEnabled: {
          'script-src': false,
          'style-src': false,
        },
        nonceEnabled: {
          'script-src': false,
          'style-src': false,
        },
      }
    ),
  ],
};
