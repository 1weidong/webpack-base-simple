const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');
console.log(path.join(__dirname, './*.html'))
module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        port: 8080,
        inline: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: '/\.css$/',
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            // {
            //     test: '/\.(sass | scss)$/',
            //     use: ['style-loader', "css-loader", "sass-loader"]
            // },
            {
                test: '/\.js$/',
                loader: 'babel-loader',
                include: [path.resolve('src')]
            },
            {
                test: '/\.(png | jpe?g | gif | svg)(\?.*)?$/',
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.resolve('src/img/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new PurifyCssWebpack({
            paths: glob.sync(path.join(__dirname, './*.html'))
        })
    ]
}
