const { environment } = require('@rails/webpacker')

const { resolve } = require('path')
environment.config.merge({
  resolve: {
    alias: {
      '@': resolve('app/javascript'),
    },
  },
})
module.exports = environment
