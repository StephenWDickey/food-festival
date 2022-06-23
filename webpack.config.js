// import path from node
const path = require('path');

// import webpack module so
// the plugins feature works
const webpack = require('webpack');


// import webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// import webpack-pwa-manifest plugin
// to help us create manifest.json file
// so we can make this app a PWA
const WebpackPwaManifest = require('webpack-pwa-manifest');
// now we can invoke this in the plugins section



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
    // we create module property, and implement
    // a regex for our jpg images
    // we also use our file-loader package
    module: {
        rules: [
            {
                // regex for .jpg files
                test: /\.jpg$/i,
                // implement file-loader package 
                use: [
                    {
                        loader: 'file-loader',
                        // with the options property we can be
                        // more specific with how our images
                        // are named and where they're sent
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace("../", "/assets")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
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
        }),
        // we write new WebpackPwaManifest to invoke the
        // constructor function for the manifest
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            // specifies homepage in relation to manifest file
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            // this will create unique fingerprints each time
            // a manifest is generated, but we dont want that
            fingerprints: false,
            // this is related to fingerprints, but
            // since it is false we do not need this property
            inject: false,
            icons: [{
                // takes the icon from here, and creates sizes
                // specified in the array
                // then it is sent to destination directory specified
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })

    ],
    // default mode for webpack is production
    // we set it to development
    mode: 'development',
    // for some reason I had to add this
    // to be able to access localhost:8080
    // found this solution online
    devServer: {
        static: "./",
    }
};