const environment = require('./environment')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

environment.plugins.append(
  'ForkTsCheckerWebpackPlugin',
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: path.resolve(__dirname, '../../tsconfig.json')
    },
    async: false
  })
)

module.exports = environment.toWebpackConfig()
