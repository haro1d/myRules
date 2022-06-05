
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    lintOnSave:false,//这里禁止使用eslint-loader
    publicPath: './',
    configureWebpack: config => {
    if (isProd) {
      config.externals = {
        'vue': 'Vue',
        'element-ui': "ELEMENT"
      }
    }
  }
}