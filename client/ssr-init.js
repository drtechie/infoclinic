require('dotenv').config();
require('ignore-styles');
require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel',
    ]
});

require('./server');