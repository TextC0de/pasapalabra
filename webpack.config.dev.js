const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js'],
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@server': path.resolve(__dirname, 'server/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: '2',
                                targets: {
                                    browsers: ['last 2 versions', 'ie >= 9']
                                }
                            }
                        ],
                        '@babel/preset-react'
                    ]
                }
            }
        ]
    }
};
