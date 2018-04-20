const path = require('path')
const webpack = require("webpack")
const HTMLPlugin = require("html-webpack-plugin")
const ExtractPlugin = require('extract-text-webpack-plugin'); // 分离css文件


const isDev = process.env.NODE_ENV === 'development' // 判断是不是开发环境

const config = {
    target: 'web',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader'
        }, {

        }, {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            use: [{
                loader: 'url-loader', // 包含了file-loader
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                }
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

// 配置环境
if (isDev) {
    config.module.rules.push({
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
    })
    config.devtool = '#cheap-module-eval-source-map' // 协助调试代码
    config.devServer = {
        port: '8888',
        host: '0.0.0.0', // 127.0.0.1 相比这样可以在内网ip都能够访问到
        overlay: {
            error: true, // 有错误显示在网页上
        },
        open: false, // 启动时自动打开浏览器
        hot: true, // 热更新
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    // 生成坏境的配置
    config.entry = { // 将所用到的类库单独打包,比如：vue、vue-router、vuex
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    };
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
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
    });

    config.plugins.push(
        new ExtractPlugin('style.[contentHash:8].css'),
        // 将库代码单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // vendor名称必须相等
        }),
        // webpack相关的代码单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

module.exports = config