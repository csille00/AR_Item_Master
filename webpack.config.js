// webpack.config.js
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    // The entry point of your application
    entry: './src/App.tsx',

    // The output directory and filename for the bundle
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    // Resolve extensions for TypeScript and JavaScript files
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new Dotenv(),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
    },
};