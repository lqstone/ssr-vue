const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development' // 判断是不是开发环境

const config = {
    target: 'web',
    entry: path.resolve(__dirname, '../client/index.js'), // 入口
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: createVueLoaderOptions(isDev)
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/ // 排除这个问价夹中的问价
        }, {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            use: [{
                loader: 'url-loader', // 包含了file-loader
                options: {
                    limit: 1024,
                    name: 'resource/[path][name].[hash:8].[ext]' // 配置静态文件路径
                }
            }]
        }]
    }
}

module.exports = config