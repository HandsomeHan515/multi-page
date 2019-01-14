const path = require('path')
const glob = require('glob')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const html = glob.sync('src/pages/**/*.html').map(path => {
    let name = path.substring(path.lastIndexOf('\/') + 1, path.lastIndexOf('.'))
    return new HTMLWebpackPlugin({
        template: path,
        filename: name + '.html',
        chunks: [name], // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
        minify: {
            collapseWhitespace: false // 压缩选项
        }
    })
})

const genEntries = () => {
    let entryFiles = glob.sync('src/pages/**/*.js')
    let map = {}
    entryFiles.forEach(filePath => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = path.resolve(__dirname, filePath)
    })
    return map
}

const entries = genEntries()

module.exports = {
    mode: 'production',
    entry: entries,
    output: {
        filename: 'static/js/[name].bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ["env"],
                    plugins: [
                        'transform-runtime'
                    ]
                }
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src')],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer'),
                                require('cssnano')
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'static/image/[name].[ext]',
                },
            }
        ]
    },
    plugins: [
        ...html,
        new CleanWebpackPlugin(['dist']),
        new DashboardPlugin({
            port: 3001,
            color: '#ccc',
            title: 'multi'
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].bundle.css",
            chunkFilename: "static/css/[id].chunk.css"
        }),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true, // 是否压缩打包文件 默认为 true
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    minSize: 1,
                    chunks: 'all',
                    priority: 0,
                    minChunks: 2 // 使用含n个及以上的打包为一个文件
                },
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    }
}

