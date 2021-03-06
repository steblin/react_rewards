var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: { path: path.join(__dirname, 'dist'), filename: 'bundle.js' },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
};