const path = require('path');

module.exports = {
    mode: "development",
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    watch: true,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ,
            {
                test: /\.css$/, use: ['style-loader', 'css-loader'
                ],
            },
        ],
    },
};