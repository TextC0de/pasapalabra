module.exports = {
    env: {
        node: true,
        browser: true
    },
    extends: [
        'airbnb',
        'prettier',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jsx-a11y/recommended'
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-one-expression-per-line': 'off'
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.config.dev.js'
            }
        }
    }
};
