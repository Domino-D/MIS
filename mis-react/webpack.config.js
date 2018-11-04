const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebPackPlugin({
    template: './index.html',
    filename: 'index.html'
})
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.js'],
    devtool: 'inline-source-map',
    plugins: [
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
                  '^/api': ''
                }
            }
        }
    },
    module:{
        rules: [
            {
                test: /\.css$/, 
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[path][name]-[local]-[hash:6]',
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
                test: /\.(js|jsx)$/,
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
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    externals: {
        axios: '$'
    }
}