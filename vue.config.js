module.exports = {
  devServer: {
    port: 9010,
    https: true
  },
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        }
      ]
    }
  }
}
