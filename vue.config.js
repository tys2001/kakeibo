const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    config.plugins.push(
      new GenerateSW({
        cacheId: 'kakeibo',
        skipWaiting: true,
        clientsClaim: false
      })
    )
  }
}