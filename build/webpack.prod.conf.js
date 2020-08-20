const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.base.conf.js')

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: false
    }
    // optimization: {
    //     minimize: true, // 是否压缩打包文件 默认为 true
    //     splitChunks: {
    //         cacheGroups: {
    //             common: {
    //                 name: 'common',
    //                 minSize: 1,
    //                 chunks: 'all',
    //                 priority: 0,
    //                 minChunks: 2 // 使用含n个及以上的打包为一个文件
    //             },
    //             vendor: {
    //                 name: "vendor",
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: "all",
    //                 priority: 10
    //             }
    //         }
    //     }
    // }
})