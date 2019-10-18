module.exports = {
  lintOnSave: 'default',

  // chainWebpack: config => {
  //   const oneOfsMap = config.module.rule('scss').oneOfs.store;
  //   oneOfsMap.forEach(item => {
  //     item.use('sass-resources-loader').loader('sass-resources-loader').options({
  //       resources: './src/styles/basic.scss'
  //     }).end();
  //   });
  // },

  devServer: {
    port: 15008,

    proxy: {
      '^/api/shop/': {
        target: 'http://47.92.154.203:666',
        changeOrigin: true,
      }
    }
  }
};
