const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { resolve, entry, html } = require('./util')

module.exports = {
    entry,
    output: {
        filename: 'static/js/[name].bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        path: resolve('dist')
    },
    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [resolve('src')],
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                }
            },
            {
                test: /\.scss$/,
                include: [resolve('src')],
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
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'static/image/[name].[ext]',
                },
            }
        ]
    },
    plugins: [
        ...html,
        new MiniCssExtractPlugin({
            filename: "static/css/[name].bundle.css",
            chunkFilename: "static/css/[id].chunk.css"
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: resolve('static/image'),//打包的静态资源目录地址
        //             to: resolve('dist/static/image') //打包到dist下面的public
        //         },
        //         {
        //             from: resolve('static/css'),
        //             to: resolve('dist/static/css')
        //         },
        //         {
        //             from: resolve('static/js'),
        //             to: resolve('dist/static/js')
        //         }
        //     ]
        // }),
    ],
}

