const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')

const common = require('./common')
const { resolve } = require('./util')

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false
  },
  entry: {
    app: resolve('src/index.js'),
    // main: resolve('src/App.js'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve('dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: resolve('/public/style'),
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.scss', '.sass', '.css' ],
    alias: {
      '@': resolve('src'),
      '@reducer': resolve('src/redux/reducers'),
      '@action': resolve('src/redux/actions'),
    },
  },

  plugins: [
    new CleanWebpackPlugin,
    new LodashModuleReplacementPlugin,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
    }),
  ],
})
