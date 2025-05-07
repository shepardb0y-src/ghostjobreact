const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/popup.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            "path": require.resolve("path-browserify"),  // Added this line
            "querystring": require.resolve("querystring-es3"),
            "zlib": require.resolve("browserify-zlib"),
            "util": require.resolve("util"),
            "assert": require.resolve("assert"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer"),
            "inspector": false,
        },
    },
    watch: true,
};