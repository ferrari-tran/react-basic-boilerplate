var webpack           = require('webpack');
var path              = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR         = path.join(__dirname, 'dist');
var APP_DIR           = path.join(__dirname, 'src');

const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router-dom'
];

var config = {
    mode: "development", // default or "production"
    entry: {
        bundle: APP_DIR + '/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: BUILD_DIR,
        filename: 'static/[name].[hash].js',
        // chunkFilename: 'chunks/[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    chunks: "initial",
                    test: /node_modules/,
                    name: "vendor",
                    enforce: true,
                    priority: 10
                }
            }
        },
        runtimeChunk: {
            name: "manifest"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    // options: {
                    //     babelrc: true,
                    //     presets: ["@babel/preset-env", "@babel/preset-react"],
                    //     plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties']
                    // }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer: {
        contentBase: [ BUILD_DIR ],
        compress: true,
        port: 9000,
        disableHostCheck: true,
        // headers: {
        //     "X-Custom-Header": "custom"
        // },
        open: false, // auto open in new tab when run
        hot: true // hot reload
    }
}

module.exports = config;

