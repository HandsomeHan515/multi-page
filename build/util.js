const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => {
    return path.join(__dirname, '..', dir)
}

const html = glob.sync('src/pages/*/*.html').map(path => {
    let name = path.substring(path.lastIndexOf('\/') + 1, path.lastIndexOf('.'))
    return new HtmlWebpackPlugin({
        template: path,
        filename: name + '.html',
        chunks: [name], // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
        minify: {
            collapseWhitespace: false, // 压缩选项
            removeAttributeQuotes: true,
            collapseWhitespace: false
        }
    })
})

let entry = {}
glob.sync('src/pages/*/*.js').map(path => {
    let name = path.substring(path.lastIndexOf('\/') + 1, path.lastIndexOf('.'))
    entry[name] = resolve(path)
})

module.exports = { resolve, html, entry }
