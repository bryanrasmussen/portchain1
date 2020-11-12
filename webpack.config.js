const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const path = require('path');

const rootHtml = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    inject: false,
    chunks: 'index'
});

const SVGPlugin = new HtmlWebpackInlineSVGPlugin({
    runPreEmit: true
});

const BabelConfig = require('./babel.config');


module.exports = {
    entry:  {
        app : __dirname + "/src/index.js"
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.ts', '.tsx',".js", ".jsx", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.md$/i,
                use: 'raw-loader',
            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                'file-loader',
                {
                  loader: 'image-webpack-loader',
                  options: {
                      name: 'images/[name].[ext]'
                  },
                },
              ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: BabelConfig
                    }
                ]
            },
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
            { test: /\.ts?$/, loader: "ts-loader", exclude: /node_modules/ },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']

            }]},
    
    devServer: {
        overlay: true
    },
    plugins: [rootHtml, SVGPlugin]
};
