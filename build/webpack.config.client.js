const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin') // 分离css文件
const merge = require('webpack-merge') // 合并webpack工具
const baseConfig = require('./webpack.config.base') // 引入base文件

const isDev = process.env.NODE_ENV === 'development' // 判断是不是开发环境

const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
]

const devServer = {
  port: '8888',
  host: '0.0.0.0', // 127.0.0.1 相比这样可以在内网ip都能够访问到
  overlay: {
    error: true // 有错误显示在网页上
  },
  open: false, // 启动时自动打开浏览器
  hot: true // 热更新
}
let config

// 配置环境
if (isDev) {
  config = merge(baseConfig, { // 进行合并
    devtool: '#cheap-module-eval-source-map', // 协助调试代码
    module: {
      rules: [{
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'less-loader'
        ]
      }]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  // 生产坏境的配置
  config = merge(baseConfig, {
    entry: { // 将所用到的类库单独打包,比如：vue、vue-router、vuex
      app: path.resolve(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [{
        test: /\.less$/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        })
      }]
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin('style.[contentHash:8].css'),
      // 将库代码单独打包
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor' // vendor名称必须相等
      }),
      // webpack相关的代码单独打包
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
