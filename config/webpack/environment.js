const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
const { resolve } = require('path')
environment.config.merge({
  resolve: {
    alias: {
      '@': resolve('app/javascript')
    }
  }
})
module.exports = environment
