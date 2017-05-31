var path = require('path');
var webpack = require('webpack');
     
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss?/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};