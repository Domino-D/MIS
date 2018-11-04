const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebPackPlugin({
    template: './index.html',
    filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.js'],
    devtool: 'inline-source-map',
    plugins: [
        new VueLoaderPlugin(),
        htmlPlugin,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './',
        hot: true,
        proxy: {
            '/api': {
              target: 'http://127.0.0.1:3000',
              pathRewrite: {
                  '^/api' : ''
                }
            }
        }
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/, 
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            }
        ]
    },
    externals: {
        vue: 'Vue',
        router: 'VueRouter',
        axios: '$'
    }
}