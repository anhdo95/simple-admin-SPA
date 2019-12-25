const path = require('path')

module.exports = {
  resolve: (relativePath) => path.resolve(__dirname, '..', relativePath)
}