const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const config = require('./config.js')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        publicPath: '/',
        host: config.dev.host,
        port: config.dev.port,
        compress: true,
        noInfo: true,
        disableHostCheck: true,
        // open: true,
        inline: true,
        proxy: {
            '/api': {
                target: 'http://192.168.26.77:6081',
                pathRewrite: { '^/api': '' },
                secure: false
            }
        }
    }
})
