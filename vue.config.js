const { publicPath, proxy } = require('./src/config')
const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      /**
       * 设置全局scss
       * 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
       * 因为 `scss` 语法在内部也是由 sass-loader 处理的
       * 但是在配置 `data` 选项的时候
       * `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
       * 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
       */
      scss: {
        // prependData: '@import "~@/styles/global.scss";'
      }
    }
  },
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set('@c', resolve('./src/components'))
      .set('@img', resolve('./src/assets/images'))
  },
  devServer: {
    proxy
  }
}