const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const common = require('./common')
const { resolve } = require('./util')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: '/'
  },

  devtool: 'source-map',
  devServer: {
    contentBase: resolve('dist'),
    hot: true,
    port: 8000,
    historyApiFallback: true,
    host: '127.0.0.1',
    // host: '0.0.0.0' // allow to be accessible externally
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
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
          'style-loader',
          'css-loader',
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
								loader: "url-loader",
						}
				]
			},
    ],
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
