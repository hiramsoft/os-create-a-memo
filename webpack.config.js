'use strict';

const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    module: {
        noParse: /\.min\.js$/,
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react"]
                    }
                }],
            },

            // Loaders for other file types can go here

        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html', to: '' },
            { from: './about.html', to: ''},
        ], {

            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: true
        })
    ],

    context: __dirname + "/src",
    entry: {
        app: ["./create-a-memo-app.js"],
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist/",
        publicPath: "",            // New
    },
    devServer: {
        //contentBase: __dirname + "/src",  // New
    },
};