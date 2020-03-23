
const cdn = {
  js: [
    'https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js',
    'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js',
    'https://cdn.jsdelivr.net/npm/vue-baidu-map@0.21.22/index.min.js'
  ]
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dist' : '/', // 基本路径
  outputDir: './dist', // 输出文件目录
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production', // eslint-loader 是否在保存的时候检查
  runtimeCompiler: false,
  // webpack配置
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') { // 判断是什么环境
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
      // 生产环境注入cdn
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'lodash': '_',
        'vue-baidu-map': 'VueBaiduMap'
      }
      config.entry = ['babel-polyfill', './src/main.js']
    }
  },
  // vue-loader 配置项
  // vueLoader: {},
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      less: {
        modifyVars: {
          // 可修改vant变量 https://github.com/youzan/vant/blob/dev/src/style/var.less
          'red': '#E81F7B',
          'text-color': '#333333',
          'button-border-radius': '3px',
          'button-default-background-color': '#f8f8f8',
          'nav-bar-icon-color': '@text-color',
          'nav-bar-title-text-color': '@text-color',
          'nav-bar-text-color': '@text-color',
          'cell-value-color': '#666666'
        }
      }
    }, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  // webpack-dev-server 相关配置
  devServer: {
    open: false,
    port: 8486,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://test.beeke.vip',
        ws: true,
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
      '/dev-api': {
        target: 'https://t-appportal.meitianhui.com/gatewayapi',
        ws: true,
        pathRewrite: { '^/dev-api': '' },
        changeOrigin: true
      }
    }
  }
}
