const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/enum.js',
    output: {
        filename: 'enum.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Enum',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    devtool: 'cheap-source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false
            },
            sourceMap: true
        })
    ]

};
