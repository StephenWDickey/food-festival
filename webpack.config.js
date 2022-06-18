// import path from node
const path = require('path');

// import webpack module so
// the plugins feature works
const webpack = require('webpack');


// import webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// we pass 3 options into webpack:
// entry, output, mode
module.exports = {
    // entry tells us which js file we
    // are bundling
    // we will create entry object with multiple
    // entry points (since we have code split)
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    // this is where we send bundled js file
    output: {
        // [name] will give each bundled file a unique name
        // based on the entry point file
        filename: '[name].bundle.js',
        path: __dirname + "/dist",
    },
    // plugins is a feature of webpack module
    // it will allow webpack to recognize 
    // dependencies, in this case jquery
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // add webpack bundle analyzer as plugin
        new BundleAnalyzerPlugin({
            // generates a report in dist directory
            // can be set to disable
            analyzerMode: "static",
        })
    ],
    // default mode for webpack is production
    // we set it to development
    mode: 'development'
};