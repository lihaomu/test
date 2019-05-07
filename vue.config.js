module.exports = {
  productionSourceMap: false,

  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  filenameHashing: false,
  devServer: {
    host: 'localhost',
    port: 1024,
    https: false,
    open: true,
    hotOnly: false,
    proxy: null,
    before: app => {
    }
  }
};