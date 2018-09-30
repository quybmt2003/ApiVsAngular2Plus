var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var helpers = require('./helpers')

module.exports = {
    entry: {
        polyfill: './ClientApp/src/polyfill',
        vendor: './ClientApp/src/vendor',
        app: './ClientApp/src/main'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [{
            test: /\.ts$/,
            loaders: [
                {
                    loader: 'awesome-typescript-loader',
                    options: {configFileName: helpers.root('tsconfig.json')}
                },
                'angular2-template-loader'
            ],
            exclude: [helpers.root('../node_modules')]
        },
        {
            test: /\.js$/,
            exclude: helpers.root('../node_modules')
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },
        {
             test: /\.css$/,
             exclude: helpers.root('./ClientApp/src', 'app'),
             loader: ExtractTextPlugin.extract({
                 fallbackLoader: 'style-loader',
                 loader: 'css-loader?sourceMap'
             })
         },
         {
             test: /\.css$/,
             include: helpers.root('./ClientApp/src', 'app'),
             loader: 'raw-helper'
         }]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./ClientApp/src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfill']
        }),

        new HtmlWebpackPlugin({
            filename: helpers.root('../Views/Shared/_Layout.cshtml'),
            template: helpers.root('../Views/Shared/_Layout.cshtml'),
            inject: false
        })
    ]
}