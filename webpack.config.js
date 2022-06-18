// import path from node
const path = require('path');

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
    // default mode for webpack is production
    // we set it to development
    mode: 'development'
};