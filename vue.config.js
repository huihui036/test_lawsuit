/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:35:22
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 19:52:55
 * @Description:
 */
module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    //设置index.html  的title   
    config.plugin('html').tap(args => {
      args[0].title = '诉源治理多元化调解平台'
      return args
    })
  },
  devServer: {
    port: 8080,
    proxy: {
      '/epan-cloud': {
        target: 'http://192.168.1.41/epan-cloud',
        // target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/epan-cloud': '/'
        }
      }

    }
  }

}
