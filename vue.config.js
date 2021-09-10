/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:35:22
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 16:06:24
 * @Description:
 */
module.exports = {
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
