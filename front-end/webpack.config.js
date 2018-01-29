var path = require('path');

module.exports = {
    entry: './table.js',
    output: {
        filename: 'table_bundle.js',
        path: path.resolve(__dirname, '../src/main/resources/static/web')
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', ]
            },
        ],
    },

    watch: true

};
