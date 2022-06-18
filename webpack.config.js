// import path from node
const path = require('path');

// import webpack module so
// the plugins feature works
const webpack = require('webpack');

// we pass 3 options into webpack:
// entry, output, mode

module.exports = {
    // entry tells us which js file we
    // are bundling
    entry: './assets/js/script.js',
    // this is where we send bundled js file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    // plugins is a feature of webpack module
    // it will allow webpack to recognize 
    // dependencies, in this case jquery
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    // default mode for webpack is production
    // we set it to development
    mode: 'development'
};