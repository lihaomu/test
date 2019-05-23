module.exports = {
  productionSourceMap: false,

  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  devServer: {
    host: 'localhost',
    port: 1024,
    https: false,
    open: false,
    hotOnly: false,
    proxy: null,
    before: app => {
    }
  }
};