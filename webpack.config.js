const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/enum.js',
    output: {
        filename: 'enum.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Enum',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    }
};
