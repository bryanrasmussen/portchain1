const presets = [
    '@babel/preset-env',
    '@babel/preset-react'
];

const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
];

module.exports = {
    presets,
    plugins
};
