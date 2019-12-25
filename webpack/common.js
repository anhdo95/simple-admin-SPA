const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('./util')

module.exports = {
  entry: {
    app: resolve('src/index.js'),
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
  ],
}
