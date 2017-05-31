var path = require('path');
var webpack = require('webpack');
     
module.exports = {
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: [ /node_modules/ ]
            },
            {
                test: /\.scss?/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: [ /node_modules/ ]
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    target: 'node'
};